import { HttpStatus, Injectable } from '@nestjs/common'
import { Activities, type Prisma } from '@prisma/client'
import { getFileUrl } from '../../../../libs/global/api-config'
import { ReturnGenreObject } from '../genre/return.genre.object'
import { AdminErrors, GlobalErrorsEnum } from '../utils/common/errors'
import { defaultReturnObject } from '../utils/common/return.default.object'
import { transformActivity } from '../utils/helpers/activity-transformer'
import { serverError } from '../utils/helpers/call-error'
import { ActivityService } from '../utils/services/activity/activity.service'
import { PrismaService } from '../utils/services/prisma.service'
import type { CreateBookDto } from './dto/manipulation.book.dto'
import { EditBookDto } from './dto/manipulation.book.dto'
import type { ReviewBookDto } from './dto/review.book.dto'
import { returnBookObject } from './return.book.object'
import type { EBookType } from './types'

@Injectable()
export class BookService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly activityService: ActivityService
	) {}

	async findOne(
		where: Prisma.BookWhereUniqueInput,
		selectObject: Prisma.BookSelect = {}
	) {
		const book = await this.prisma.book.findUnique({
			where: {
				visible: true,
				...where
			},
			select: {
				...returnBookObject,
				...selectObject
			}
		})
		if (!book)
			throw serverError(HttpStatus.BAD_REQUEST, GlobalErrorsEnum.somethingWrong)
		return book
	}

	async findMany({
		where,
		select,
		orderBy,
		take = 20
	}: {
		where?: Prisma.BookWhereInput
		select?: Prisma.BookSelect
		orderBy?: Prisma.BookOrderByWithRelationInput
		take?: number
	}) {
		return this.prisma.book.findMany({
			where: {
				visible: true,
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
		const { activities, ...rest } = author

		return {
			...rest,
			activities: transformActivity(activities)
		}
	}

	async ebookById(id: number, userId: number) {
		const book = await this.findOne(
			{ id },
			{
				title: true,
				ebook: true
			}
		)
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
			//TODO: переделать тут чтобы данные сохранились но я не юзал
			data: await this.prisma.book.findMany({
				take: perPage,
				select: {
					//TODO: сделать тут через include
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
		await this.checkExist(id)
		await this.prisma.review.deleteMany({
			where: {
				bookId: id
			}
		})
		await this.prisma.book.delete({ where: { id } })
	}

	//TODO: сделать запрос более гипким
	async update(id: number, dto: EditBookDto) {
		await this.checkExist(id)
		const { genres: dtoGenres, ...other } = dto
		const majorGenre = await this.getMajorGenres(dtoGenres)
		console.log('update', majorGenre, dtoGenres, id, EditBookDto)
		await this.prisma.book.update({
			where: { id: id },
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
			bookId: id
		})
	}

	async review(userId: number, bookId: number, dto: ReviewBookDto) {
		await this.checkExist(bookId, {
			visible: true
		})
		await this.checkUserExist(userId)
		await this.activityService.create({
			type: Activities.reviewBook,
			importance: 4,
			userId,
			bookId
		})
		await this.prisma.review.create({
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
			where: { id: +id, visible: true },
			include: {
				majorGenre: false,
				genres: { select: ReturnGenreObject }
			}
		})
		if (!book)
			throw serverError(HttpStatus.BAD_REQUEST, GlobalErrorsEnum.somethingWrong)

		await this.activityService.create({
			type: Activities.visitBook,
			importance: 1,
			userId,
			bookId: id
		})

		return book
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

	private async checkExist(id: number, options?: { visible?: boolean }) {
		const exist = await this.prisma.book.findUnique({
			where: { id, ...options },
			select: {
				id: true
			}
		})

		if (!exist)
			throw serverError(HttpStatus.BAD_REQUEST, AdminErrors.bookNotFound)

		return !!exist
	}
	private async checkUserExist(id: number) {
		const userExist = await this.prisma.user.findUnique({
			where: { id: id },
			select: {
				id: true
			}
		})
		if (!userExist)
			throw serverError(HttpStatus.BAD_REQUEST, AdminErrors.userNotFound)
		return !!userExist
	}
}
