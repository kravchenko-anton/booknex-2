import { Injectable, NotFoundException } from '@nestjs/common'
import type { Prisma } from '@prisma/client'
import { getAverageColor } from 'fast-average-color-node'
import { getFileUrl } from '../../../web/services/api/api-config'
import { returnAuthorObject } from '../author/return.author.object'
import { ReturnGenreObject } from '../genre/return.genre.object'
import { UserService } from '../user/user.service'
import { shadeRGBColor } from '../utils/color.functions'
import { ErrorsEnum } from '../utils/errors'
import { PrismaService } from '../utils/prisma.service'
import { defaultReturnObject } from '../utils/return.default.object'
import type { CreateBookDto, EditBookDto } from './dto/manipulation.book.dto'
import type { ReviewBookDto } from './dto/review.book.dto'
import { returnBookObjectWithAuthor } from './return.book.object'
import { returnReviewsObject } from './return.reviews.object'

@Injectable()
export class BookService {
	constructor(
		private readonly usersService: UserService,
		private readonly prisma: PrismaService
	) {}

	async getBookById(id: number, selectObject: Prisma.BookSelect = {}) {
		const book = await this.prisma.book.findUnique({
			where: { id },
			select: {
				...returnBookObjectWithAuthor,
				...selectObject
			}
		})
		if (!book)
			throw new NotFoundException(`Book ${ErrorsEnum.Not_Found}`).getResponse()
		return book
	}

	async ebookById(id: number) {
		const book = await this.prisma.book.findUnique({
			where: { id },
			select: {
				charapters: true,
				file: true
			}
		})
		if (!book)
			throw new NotFoundException(`Book ${ErrorsEnum.Not_Found}`).getResponse()
		return {
			charapters: book.charapters,
			file: book.file
		}
	}

	async all(searchTerm: string) {
		return this.prisma.book.findMany({
			take: 20,
			select: returnBookObjectWithAuthor,
			...(searchTerm && {
				where: {
					title: {
						contains: searchTerm
					}
				}
			})
		})
	}

	async create(dto: CreateBookDto) {
		await this.prisma.book.create({
			data: {
				majorGenre: {
					connect: {
						id: dto.genres[0]
					}
				},
				title: dto.title,
				popularity: dto.popularity,
				pages: dto.pages,
				description: dto.description,
				picture: dto.picture,
				file: dto.file,
				charapters: dto.charapters,
				author: {
					connect: {
						id: dto.author.id
					}
				},
				color: shadeRGBColor(
					await getAverageColor(getFileUrl(dto.picture)).then(
						color => color.hex
					),
					-25
				),
				genres: {
					connect: dto.genres.map(g => ({ id: g }))
				}
			}
		})
	}

	async delete(id: number) {
		const book = await this.getBookById(id)
		await this.prisma.book.delete({ where: { id: book.id } })
	}

	async update(id: number, dto: EditBookDto) {
		const book = await this.getBookById(id)
		await this.prisma.book.update({
			where: { id: book.id },
			data: {
				title: dto.title || book.title,
				popularity: dto.popularity || book.popularity,
				pages: dto.pages || book.pages,
				description: dto.description || book.description,
				picture: dto.picture || book.picture,
				file: dto.file || book.file,
				charapters: dto.charapters || book.charapters,
				author: {
					connect: {
						id: dto.author.id
					}
				},
				majorGenre: {
					connect: {
						id: dto.genres[0]
					}
				},
				genres: {
					connect: dto.genres.map(g => ({ id: g }))
				}
			}
		})
	}

	emotions() {
		return this.prisma.emotion.findMany({
			select: {
				...defaultReturnObject,
				name: true,
				path: true
			}
		})
	}

	async review(userId: number, bookId: number, dto: ReviewBookDto) {
		await this.usersService.getUserById(userId)
		await this.getBookById(bookId)
		const emoji = await this.prisma.emotion.findUnique({
			where: { name: dto.emotion }
		})
		if (!emoji)
			throw new NotFoundException(
				`Emotion ${ErrorsEnum.Not_Found}`
			).getResponse()
		await this.prisma.review.create({
			data: {
				user: {
					connect: {
						id: userId
					}
				},
				book: {
					connect: {
						id: bookId
					}
				},
				tags: dto.tags,
				emotion: {
					connect: {
						name: dto.emotion
					}
				},
				text: dto.comment
			}
		})
	}

	async reviewsById(id: number, cursorId: number) {
		return this.prisma.review.findMany({
			where: { bookId: id },
			take: 20,
			cursor: cursorId && { id: cursorId },
			select: returnReviewsObject
		})
	}

	async infoById(id: number) {
		const book = await this.prisma.book.findUnique({
			where: { id: +id },
			include: {
				majorGenre: false,
				author: {
					select: returnAuthorObject
				},
				genres: { select: ReturnGenreObject }
			}
		})
		if (!book) new NotFoundException('Book not found').getResponse()
		const genreIds = book.genres.map(g => g.id)
		const similarBooks = await this.prisma.book.findMany({
			where: {
				id: { not: +id },
				genres: { some: { id: { in: genreIds } } }
			},
			select: {
				...returnBookObjectWithAuthor,
				genres: { select: ReturnGenreObject }
			}
		})

		return {
			...book,
			similarBooks: similarBooks
				.sort(
					(a, b) =>
						b.genres.filter(g => genreIds.includes(g.id)).length -
						a.genres.filter(g => genreIds.includes(g.id)).length
				)
				.slice(0, 10)
				.map(({ genres, ...rest }) => ({ ...rest }))
		}
	}
}
