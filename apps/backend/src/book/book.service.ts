import { HttpStatus, Injectable } from '@nestjs/common'
import { Activities, type Prisma } from '@prisma/client'
import { getFileUrl } from '../../../../libs/global/api-config'
import { ActivityService } from '../activity/activity.service'
import { ReturnGenreObject } from '../genre/return.genre.object'
import { UserService } from '../user/user.service'
import { transformActivity } from '../utils/activity-transformer'
import { serverError } from '../utils/call-error'
import { GlobalErrorsEnum } from '../utils/errors'
import { PrismaService } from '../utils/prisma.service'
import { defaultReturnObject } from '../utils/return.default.object'
import type { FeedbackBookDto } from './dto/feedback.book.dto'
import type { CreateBookDto, EditBookDto } from './dto/manipulation.book.dto'
import { returnBookObject } from './return.book.object'
import type { EBookType } from './types'

@Injectable()
export class BookService {
	constructor(
		private readonly usersService: UserService,
		private readonly prisma: PrismaService,
		private readonly activityService: ActivityService
	) {}

	async getBookById(id: number, selectObject: Prisma.BookSelect = {}) {
		const book = await this.prisma.book.findUnique({
			where: { id },
			select: {
				...returnBookObject,
				...selectObject
			}
		})
		if (!book)
			throw serverError(HttpStatus.BAD_REQUEST, GlobalErrorsEnum.somethingWrong)
		return book
	}

	async infoByIdAdmin(id: number) {
		const author = await this.prisma.book.findUnique({
			where: { id },
			select: {
				...returnBookObject,
				createdAt: true,
				updatedAt: true,
				pages: true,
				popularity: true,
				genres: { select: ReturnGenreObject },
				ebook: true,
				description: true,
				visible: true,
				feedback: {
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
						userId: true,
						collectionId: true
					}
				}
			}
		})
		const { activities, ...rest } = author

		return {
			...rest,
			activities: transformActivity(activities)
		}
	}

	async ebookById(id: number, userId: number) {
		const book = await this.prisma.book.findUnique({
			where: { id },
			select: {
				title: true,
				ebook: true
			}
		})
		if (!book)
			throw serverError(HttpStatus.BAD_REQUEST, GlobalErrorsEnum.somethingWrong)
		const ebook: EBookType = await fetch(getFileUrl(book.ebook)).then(result =>
			result.json()
		)

		await this.activityService.create({
			type: Activities.getEbook,
			importance: 1,
			userId,
			bookId: id
		})

		return {
			...book,
			file: ebook.map(({ chapters }) =>
				chapters
					.map(({ text, name }) => `<label id="${name}"></label> ${text}`)
					.join(' ')
			),
			chapters: ebook.map(({ title, chapters }) => ({
				title,
				children: chapters.map(({ name }) => ({
					name,
					link: `#${name}`
				}))
			}))
		}
	}

	async all(searchTerm: string, page: number) {
		const perPage = 20
		const count = await this.prisma.book.count()
		return {
			data: await this.prisma.book.findMany({
				take: perPage,
				select: {
					...returnBookObject,
					genres: { select: ReturnGenreObject },
					pages: true,
					popularity: true,
					visible: true,
					description: true,
					majorGenre: {
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
						}
					}
				})
			}),
			canLoadMore: page < Math.floor(count / perPage),
			totalPages: Math.floor(count / perPage)
		}
	}

	async create(dto: CreateBookDto) {
		const majorGenres = await this.getMajorGenres(dto.genres)
		await this.prisma.book.create({
			data: {
				majorGenre: {
					connect: {
						id: majorGenres[0].id
					}
				},
				activities: {
					create: {
						type: Activities.createBook,
						importance: 9
					}
				},
				title: dto.title,

				popularity: dto.popularity,
				pages: dto.pages,
				description: dto.description,
				picture: dto.picture,
				ebook: dto.ebook,
				author: dto.author,
				genres: {
					connect: dto.genres.map(g => ({ id: g }))
				}
			}
		})
	}

	async delete(id: number) {
		const book = await this.getBookById(id)
		await this.prisma.feedback.deleteMany({
			where: {
				bookId: id
			}
		})
		await this.prisma.book.delete({ where: { id: book.id } })
	}

	//TODO: сделать запрос более гипким
	async update(id: number, dto: EditBookDto) {
		const book = await this.getBookById(id)
		const { genres: dtoGenres, ...other } = dto
		const majorGenre = await this.getMajorGenres(dtoGenres)
		await this.prisma.book.update({
			where: { id: book.id },
			data: {
				...other,
				...(dtoGenres && {
					genres: {
						set: dtoGenres.map(g => ({ id: g }))
					},
					majorGenre: {
						connect: {
							id: majorGenre[0].id
						}
					}
				})
			}
		})

		await this.activityService.create({
			type: Activities.updateBook,
			importance: 9,
			bookId: book.id
		})
	}

	async feedback(userId: number, bookId: number, dto: FeedbackBookDto) {
		await this.usersService.getUserById(userId)
		await this.getBookById(bookId)

		await this.activityService.create({
			type: Activities.feedbackBook,
			importance: 4,
			userId,
			bookId
		})
		await this.prisma.feedback.create({
			data: {
				rating: dto.rating,
				tags: dto.tags,
				text: dto.comment,
				user: {
					connect: {
						id: userId
					}
				},
				book: {
					connect: {
						id: bookId
					}
				}
			}
		})
	}

	async infoById(id: number, userId: number) {
		const book = await this.prisma.book.findUnique({
			where: { id: +id },
			include: {
				majorGenre: false,
				genres: { select: ReturnGenreObject }
			}
		})
		if (!book)
			throw serverError(HttpStatus.BAD_REQUEST, GlobalErrorsEnum.somethingWrong)
		const genreIds = book?.genres.map(g => g.id) || []

		const similarBooks = await this.getSimilarBooks(genreIds, id)

		await this.activityService.create({
			type: Activities.visitBook,
			importance: 1,
			userId,
			bookId: id
		})

		return {
			...book,
			similarBooks
		}
	}
	async getSimilarBooks(genresIds: number[], id: number) {
		const similarBooks = await this.prisma.book.findMany({
			where: {
				id: { not: +id },
				genres: { some: { id: { in: genresIds } } }
			},
			select: {
				...returnBookObject,
				genres: { select: ReturnGenreObject }
			}
		})

		return similarBooks
			.sort(
				(a, b) =>
					b.genres.filter(g => genresIds?.includes(g.id)).length -
					a.genres.filter(g => genresIds?.includes(g.id)).length
			)
			.slice(0, 10)
			.map(({ genres, ...rest }) => ({ ...rest }))
	}

	async getMajorGenres(genres: number[]) {
		return this.prisma.genre.findMany({
			where: {
				id: {
					in: genres
				}
			},
			select: {
				id: true
			},
			orderBy: {
				majorBooks: {
					_count: 'asc'
				}
			},
			take: 1
		})
	}
}
