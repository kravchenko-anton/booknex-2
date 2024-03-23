import { HttpStatus, Injectable } from '@nestjs/common'
import { Activities, type Prisma } from '@prisma/client'
import Sentry from '@sentry/node'
import { AdminErrors, GlobalErrorsEnum } from '../../../../libs/global/errors'
import { transformActivity } from '../../../../libs/global/utils/activity-transformer'
import { ReturnGenreObject } from '../genre/return.genre.object'
import { StorageService } from '../storage/storage.service'
import { StorageFolderEnum } from '../storage/storage.types'
import { defaultReturnObject } from '../utils/common/return.default.object'
import { serverError } from '../utils/helpers/call-error'
import { ActivityService } from '../utils/services/activity/activity.service'
import { PrismaService } from '../utils/services/prisma.service'
import type { CreateBookDto } from './dto/create.book.dto'
import type { UpdateBookDto, UpdateGenreDto } from './dto/update.book.dto'
import type { PayloadEBook } from './ebook/ebook.model'
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
		onlyVisible = true
	}: {
		where?: Prisma.BookWhereUniqueInput
		select?: Prisma.BookSelect
		onlyVisible?: boolean
	}) {
		const book = await this.prisma.book.findUnique({
			where: {
				...(onlyVisible && { visible: true }),
				...where
			},
			select: {
				...returnBookObject,
				...select
			}
		})
		if (!book) {
			Sentry.captureException(
				new Error('Book not found' + { extra: { where, select, onlyVisible } })
			)
			throw serverError(HttpStatus.BAD_REQUEST, GlobalErrorsEnum.unknownError)
		}
		return book
	}

	async findMany({
		where,
		select,
		orderBy,
		take = 20,
		onlyVisible = true
	}: {
		where?: Prisma.BookWhereInput
		select?: Prisma.BookSelect
		orderBy?: Prisma.BookOrderByWithRelationInput
		take?: number
		onlyVisible?: boolean
	}) {
		return this.prisma.book.findMany({
			where: {
				...(onlyVisible && { visible: true }),
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

	async checkExist(
		id: number,
		options?: {
			visible?: boolean
		}
	) {
		const exist = await this.prisma.book.findUnique({
			where: { id, ...options },
			select: {
				id: true
			}
		})

		if (!exist)
			throw serverError(HttpStatus.BAD_REQUEST, GlobalErrorsEnum.somethingWrong)

		return !!exist
	}

	async infoById(id: number, userId: number) {
		const book = await this.findOne({
			where: { id: +id, visible: true },
			select: {
				description: true,
				mainGenre: false,
				readingTime: true,
				rating: true,
				genres: { select: ReturnGenreObject }
			}
		})

		await this.activityService.create({
			type: Activities.visitBook,
			importance: 1,
			userId,
			bookId: id
		})

		return book
	}

	async infoByIdAdmin(id: number) {
		const book = await this.findOne({
			where: { id },
			onlyVisible: false,
			select: {
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
				onlyVisible: false,
				select: {
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
					visible: 'asc'
				},
				...(page && {
					skip: page * perPage
				}),
				...(searchTerm && {
					where: {
						title: {
							contains: searchTerm
						},
						id: {
							equals: Number.parseInt(searchTerm)
						}
					}
				})
			}),
			canLoadMore: page < Math.floor(count / perPage),
			totalPages: Math.floor(count / perPage)
		}
	}

	async create(dto: CreateBookDto, picture: Express.Multer.File) {
		const { genreIds, mainGenreId } = await this.getGenres(dto.genres)
		const { readingTime, uploadedEbook, chaptersCount } = useGetEbook(dto.ebook)
		const { name: pictureName } = await this.storageService.upload({
			folder: 'booksCovers',
			file: picture.buffer,
			role: 'admin',
			filename: dto.title + '.png'
		})
		const { name: ebookName } = await this.storageService.upload({
			folder: 'ebooks',
			file: Buffer.from(JSON.stringify(uploadedEbook)),
			role: 'admin',
			filename: dto.title + '.json'
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
			throw serverError(HttpStatus.BAD_REQUEST, AdminErrors.bookAlreadyExist)
		await this.prisma.book.create({
			data: {
				activities: {
					create: {
						type: Activities.createBook,
						importance: 9
					}
				},
				chapters: chaptersCount,
				title: dto.title,
				picture: pictureName,
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
						id: mainGenreId
					}
				}
			}
		})
	}

	async remove(id: number) {
		await this.checkExist(id)
		await this.prisma.review.deleteMany({
			where: {
				bookId: id
			}
		})
		await this.prisma.book.delete({ where: { id } })
	}

	async updateEbook(id: number, dto: PayloadEBook[]) {
		await this.checkExist(id)
		const { uploadedEbook, readingTime, chaptersCount } = useGetEbook(dto)
		const book = await this.findOne({
			where: { id },
			select: {
				title: true
			}
		})
		const { name: ebookName } = await this.storageService.upload({
			folder: StorageFolderEnum.ebooks,
			file: Buffer.from(JSON.stringify(uploadedEbook)),
			role: 'admin',
			filename: `${book.title}.json`
		})
		await this.activityService.create({
			type: Activities.updateEBook,
			importance: 7,
			bookId: id
		})
		await this.prisma.book.update({
			where: { id },
			data: {
				ebook: ebookName,
				readingTime,
				chapters: chaptersCount
			}
		})
	}
	async updatePicture(id: number, picture: Express.Multer.File) {
		const book = await this.findOne({
			where: { id },
			select: {
				title: true
			}
		})
		const { name: pictureName } = await this.storageService.upload({
			folder: 'booksCovers',
			file: picture.buffer,
			role: 'admin',
			filename: book.title + '.png'
		})
		await this.activityService.create({
			type: Activities.updatePicture,
			importance: 7,
			bookId: id
		})
		await this.prisma.book.update({
			where: { id },
			data: {
				picture: pictureName
			}
		})
	}
	async updateGenre(id: number, dto: UpdateGenreDto) {
		await this.checkExist(id)
		const { genreIds, mainGenreId } = await this.getGenres(dto.genres)
		await this.activityService.create({
			type: Activities.updateGenre,
			importance: 7,
			bookId: id
		})
		await this.prisma.book.update({
			where: { id },
			data: {
				genres: {
					set: genreIds
				},
				mainGenre: {
					connect: {
						id: mainGenreId
					}
				}
			}
		})
	}
	async update(id: number, dto: UpdateBookDto) {
		await this.checkExist(id)
		await this.prisma.book.update({
			where: { id },
			data: dto
		})

		await this.activityService.create({
			type: Activities.updateBook,
			importance: 7,
			bookId: id
		})
	}
	async getGenres(genres: number[]) {
		const mainGenre = await this.prisma.genre.findFirst({
			where: {
				id: {
					in: genres
				}
			},
			select: {
				id: true
			},
			orderBy: {
				mainBooks: {
					_count: 'asc'
				}
			}
		})
		if (genres.length < 2 || !mainGenre)
			throw serverError(HttpStatus.BAD_REQUEST, GlobalErrorsEnum.somethingWrong)
		return {
			mainGenreId: mainGenre.id,
			genreIds: genres.map(id => ({ id }))
		}
	}
}
