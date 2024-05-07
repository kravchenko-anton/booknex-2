import { ActivityService } from '@/src/activity/activity.service'
import { HttpStatus, Injectable } from '@nestjs/common'
import { Activities, type Prisma } from '@prisma/client'
import { adminErrors, globalErrors } from 'global/errors'
import { slugify } from 'global/helpers/slugify'
import { checkHtmlValid } from 'global/utils/html-validation'
import { ReturnGenreObject } from '../genre/return.genre.object'
import { StorageService } from '../storage/storage.service'
import { serverError } from '../utils/helpers/server-error'
import { PrismaService } from '../utils/services/prisma.service'
import type { Book } from './book.entity'
import type { UpdateBookDtoExtended } from './book.types'
import type { CreateBookDto } from './dto/create.book.dto'

import type { UpdateBookDto } from './dto/update.book.dto'

import { returnBookObject } from '@/src/book/return.book.object'
import { useEbookCalculation } from './helpers/get-ebook'

@Injectable()
export class BookService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly activityService: ActivityService,
		private storageService: StorageService
	) {}

	async infoBySlug(slug: string, userId: number) {
		const book = await this.prisma.book.findUnique({
			where: { slug, isPublic: true },
			select: {
				title: true,
				isPublic: true,
				slug: true,
				chapters: true,
				picture: true,
				author: true,
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

		return {
			...book,
			fromSameAuthor: await this.prisma.book.findMany({
				where: {
					isPublic: true,
					author: book.author
				},
				select: returnBookObject
			})
		}
	}

	async infoBySlugAdmin(slug: string) {
		const book = await this.prisma.book.findUnique({
			where: { slug },
			select: {
				id: true,
				chapters: true,
				title: true,
				picture: true,
				recommendable: true,
				author: true,
				slug: true,
				createdAt: true,
				updatedAt: true,
				rating: true,
				readingTime: true,
				genres: {
					select: {
						name: true,
						slug: true,
						icon: true
					}
				},
				ebook: true,
				description: true,
				isPublic: true,
				review: {
					select: {
						tags: true,
						text: true,
						rating: true,
						user: {
							select: {
								id: true,
								email: true,
								picture: true
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

				readingHistory: {
					where: {
						bookSlug: slug
					},
					select: {
						endDate: true,
						progress: true,
						readingTimeMs: true,
						scrollPosition: true,
						startDate: true
					}
				}
			}
		})
		if (!book)
			throw serverError(HttpStatus.BAD_REQUEST, globalErrors.somethingWrong)
		const { readingHistory = [], ...rest } = book
		console.log('activities', readingHistory)

		return {
			...rest,
			statistics: readingHistory.reduce<
				{
					startDate: Date
					endDate: Date
					readingTimeMs: number
					progress: number
				}[]
			>((accumulator, current) => {
				const exist = accumulator.find(
					({ startDate }) => startDate === current.startDate
				)
				if (exist) {
					exist.readingTimeMs += current.readingTimeMs
					exist.progress = Math.max(exist.progress, current.progress)
				} else {
					accumulator.push(current)
				}
				return accumulator
			}, [])
		}
	}

	async catalog(searchTerm: string, page: number) {
		const perPage = 20
		const count = await this.prisma.book.count()
		return {
			data: await this.prisma.book.findMany({
				take: perPage,
				select: {
					author: true,
					chapters: true,
					title: true,
					picture: true,
					slug: true,
					genres: { select: ReturnGenreObject },
					readingTime: true,
					rating: true,
					isPublic: true,
					description: true,
					mainGenre: {
						select: ReturnGenreObject
					}
				},
				orderBy: {
					isPublic: 'asc' as const
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
		const { readingTime, uploadedEbook, chaptersCount } = useEbookCalculation(
			dto.ebook
		)

		const { isValid, messages } = await checkHtmlValid(
			uploadedEbook
				.map(book =>
					book.chapters.map(chapter => `${chapter.text}`.trim()).join('')
				)
				.join('')
		)
		console.log('isValid', isValid)
		if (!isValid) throw serverError(HttpStatus.BAD_REQUEST, messages)

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
		const book = await this.prisma.book.findUnique({
			where: { slug },
			select: {
				id: true,
				title: true,
				ebook: true
			}
		})
		if (!book)
			throw serverError(HttpStatus.BAD_REQUEST, globalErrors.somethingWrong)
		const { genres, title, ebook, ...rest } = dto

		let updateData: UpdateBookDtoExtended = { ...rest }

		if (ebook) {
			const { uploadedEbook, readingTime, chaptersCount } =
				useEbookCalculation(ebook)
			const { isValid, messages } = await checkHtmlValid(
				uploadedEbook
					.map(book =>
						book.chapters.map(chapter => `${chapter.text}`.trim()).join('')
					)
					.join('')
			)
			if (!isValid) throw serverError(HttpStatus.BAD_REQUEST, messages)

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
			const { genreIds, mainGenreSlug } = await this.getGenres(genres)
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
			where: { ...where, ...(adminVisible ? {} : { isPublic: true }) },
			select: {
				id: true
			}
		})

		if (!exist)
			throw serverError(HttpStatus.BAD_REQUEST, globalErrors.somethingWrong)

		return !!exist
	}
}
