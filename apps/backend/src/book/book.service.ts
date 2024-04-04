import { HttpStatus, Injectable } from '@nestjs/common'
import { Activities, type Prisma } from '@prisma/client'
import { adminErrors, globalErrors } from '../../../../libs/global/errors'
import { transformActivity } from '../../../../libs/global/utils/activity-transformer'
import { slugify } from '../../../../libs/global/utils/slugify'
import { ReturnGenreObject } from '../genre/return.genre.object'
import { StorageService } from '../storage/storage.service'
import { defaultReturnObject } from '../utils/common/return.default.object'
import { serverError } from '../utils/helpers/call-error'
import { ActivityService } from '../utils/services/activity/activity.service'
import { PrismaService } from '../utils/services/prisma.service'
import { Book } from './book.entity'
import { UpdateBookDtoExtended } from './book.types'
import type { CreateBookDto } from './dto/create.book.dto'

import type { UpdateBookDto } from './dto/update.book.dto'
import { useGetEbook } from './helpers/get-ebook'
import { returnBookObject } from './return.book.object'

@Injectable()
export class BookService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly activityService: ActivityService,
		private storageService: StorageService
	) {}

	async findOne({
		where,
		select,
		adminVisible = false
	}: {
		where?: Prisma.BookWhereUniqueInput
		select?: Prisma.BookSelect
		adminVisible: boolean
	}) {
		const book = await this.prisma.book.findUnique({
			where: {
				...(adminVisible ? {} : { visible: true }),
				...where
			},
			select: {
				...returnBookObject,
				...select
			}
		})
		if (!book) {
			throw serverError(HttpStatus.BAD_REQUEST, globalErrors.unknownError)
		}
		return book
	}

	async findMany({
		where,
		select,
		orderBy,
		take = 20,
		adminVisible = false
	}: {
		where?: Prisma.BookWhereInput
		select?: Prisma.BookSelect
		orderBy?: Prisma.BookOrderByWithRelationInput
		take?: number
		adminVisible?: boolean
	}) {
		return this.prisma.book.findMany({
			where: {
				...(adminVisible ? {} : { visible: true }),
				...where
			},
			take,
			select: {
				...returnBookObject,
				...select
			},
			orderBy
		})
	}

	async infoBySlug(slug: string, userId: number) {
		const book = await this.findOne({
			where: { slug, visible: true },
			adminVisible: false,
			select: {
				description: true,
				mainGenre: false,
				readingTime: true,
				rating: true,
				genres: { select: ReturnGenreObject }
			}
		})
		if (!book)
			throw serverError(HttpStatus.BAD_REQUEST, globalErrors.somethingWrong)

		await this.activityService.create({
			type: Activities.visitBook,
			importance: 1,
			userId,
			bookSlug: slug
		})

		return book
	}

	async infoBySlugAdmin(slug: string) {
		const book = await this.findOne({
			where: { slug },
			adminVisible: true,
			select: {
				slug: true,
				createdAt: true,
				updatedAt: true,
				rating: true,
				readingTime: true,
				genres: { select: ReturnGenreObject },
				ebook: true,
				description: true,
				visible: true,
				review: {
					select: {
						...defaultReturnObject,
						tags: true,
						text: true,
						rating: true,
						user: {
							select: {
								id: true,
								email: true
							}
						}
					}
				},
				_count: {
					select: {
						finishedBy: true,
						readingBy: true,
						savedBy: true
					}
				},
				activities: {
					select: {
						type: true,
						id: true,
						importance: true,
						createdAt: true,
						genreId: true,
						bookId: true,
						userId: true
					}
				}
			}
		})

		const { activities, ...rest } = book

		return {
			...rest,
			activities: transformActivity(activities)
		}
	}

	async catalog(searchTerm: string, page: number) {
		const perPage = 20
		const count = await this.prisma.book.count()
		return {
			data: await this.findMany({
				take: perPage,
				adminVisible: true,
				select: {
					slug: true,
					genres: { select: ReturnGenreObject },
					readingTime: true,
					rating: true,
					visible: true,
					description: true,
					mainGenre: {
						select: ReturnGenreObject
					}
				},
				orderBy: {
					visible: 'asc' as const
				},
				...(page && {
					skip: page * perPage
				}),
				...(searchTerm && {
					where: {
						title: {
							contains: searchTerm
						}
					},
					...(!Number.isNaN(+searchTerm) && {
						where: {
							id: +searchTerm
						}
					})
				})
			}),
			canLoadMore: page < Math.floor(count / perPage),
			totalPages: Math.floor(count / perPage)
		}
	}

	async create(dto: CreateBookDto) {
		const { genreIds, mainGenreSlug } = await this.getGenres(dto.genres)
		const { readingTime, uploadedEbook, chaptersCount } = useGetEbook(dto.ebook)

		const { name: ebookName } = await this.storageService.upload({
			folder: 'ebooks',
			file: Buffer.from(JSON.stringify(uploadedEbook)),
			fileName: dto.title + '.json'
		})
		const checkExist = await this.prisma.book.findUnique({
			where: {
				title: dto.title
			},

			select: {
				id: true
			}
		})
		if (checkExist)
			throw serverError(HttpStatus.BAD_REQUEST, adminErrors.bookAlreadyExist)
		await this.prisma.book.create({
			data: {
				slug: slugify(dto.title),
				activities: {
					create: {
						type: Activities.createBook,
						importance: 9
					}
				},
				chapters: chaptersCount,
				title: dto.title,
				picture: dto.picture,
				rating: dto.rating,
				readingTime: readingTime,
				description: dto.description,
				ebook: ebookName,
				author: dto.author,
				genres: {
					connect: genreIds
				},
				mainGenre: {
					connect: {
						slug: mainGenreSlug
					}
				}
			}
		})
	}

	async remove(slug: string) {
		await this.checkExist({
			adminVisible: true,
			where: { slug }
		})
		await this.prisma.review.deleteMany({
			where: {
				book: {
					slug
				}
			}
		})
		await this.prisma.book.delete({ where: { slug } })
	}

	async update(slug: string, dto: UpdateBookDto) {
		const book = await this.findOne({
			where: { slug },
			adminVisible: true,
			select: {
				id: true,
				ebook: true
			}
		})
		if (!book)
			throw serverError(HttpStatus.BAD_REQUEST, globalErrors.somethingWrong)
		const { genres, title, ebook, ...rest } = dto

		let updateData: UpdateBookDtoExtended = { ...rest }

		if (ebook) {
			const { uploadedEbook, readingTime, chaptersCount } = useGetEbook(ebook)
			const { name: ebookName } = await this.storageService.upload({
				folder: 'ebooks',
				file: Buffer.from(JSON.stringify(uploadedEbook)),
				fileName: `${book.title}.json`
			})

			updateData = {
				...updateData,
				ebook: ebookName,
				readingTime,
				chapters: chaptersCount
			}
		}

		if (genres) {
			const { genreIds, mainGenreSlug } = await this.getGenres(dto.genres)
			updateData = {
				...updateData,
				genres: {
					set: genreIds
				},
				mainGenre: {
					connect: {
						slug: mainGenreSlug
					}
				}
			}
		}
		if (title) {
			updateData = {
				...updateData,
				slug: slugify(title)
			}
		}

		await this.prisma.book.update({
			where: { id: book.id },
			data: updateData
		})

		await this.activityService.create({
			type: Activities.updateBook,
			importance: 7,
			bookSlug: slug
		})
	}

	async getGenres(genres: Book['genres']) {
		const mainGenre = await this.prisma.genre.findFirst({
			where: {
				slug: {
					in: genres.map(genre => genre.slug)
				}
			},
			select: {
				slug: true
			},
			orderBy: {
				mainBooks: {
					_count: 'asc'
				}
			}
		})
		if (genres.length < 2 || !mainGenre)
			throw serverError(HttpStatus.BAD_REQUEST, globalErrors.somethingWrong)
		return {
			mainGenreSlug: mainGenre.slug,
			genreIds: genres.map(({ slug }) => ({ slug }))
		}
	}

	async checkExist({
		where,
		adminVisible = false
	}: {
		where: Prisma.BookWhereUniqueInput
		adminVisible?: boolean
	}) {
		const exist = await this.prisma.book.findUnique({
			where: { ...where, ...(adminVisible ? {} : { visible: true }) },
			select: {
				id: true
			}
		})

		if (!exist)
			throw serverError(HttpStatus.BAD_REQUEST, globalErrors.somethingWrong)

		return !!exist
	}
}
