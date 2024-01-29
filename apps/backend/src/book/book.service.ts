import { Injectable, NotFoundException } from '@nestjs/common'
import type { Prisma } from '@prisma/client'
import { getFileUrl } from '../../../../libs/global/api-config'
import { ReturnGenreObject } from '../genre/return.genre.object'
import { UserService } from '../user/user.service'
import { ActivityEnum } from '../user/user.types'
import { ErrorsEnum } from '../utils/errors'
import { groupActivity } from '../utils/group-activity'
import { PrismaService } from '../utils/prisma.service'
import type { FeedbackBookDto } from './dto/feedback.book.dto'
import type { CreateBookDto, EditBookDto } from './dto/manipulation.book.dto'
import { returnBookObject } from './return.book.object'

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
				...returnBookObject,
				...selectObject
			}
		})
		if (!book)
			throw new NotFoundException(`Book ${ErrorsEnum.Not_Found}`).getResponse()
		return book
	}

	async infoByIdAdmin(id: number) {
		const author = await this.prisma.book.findUnique({
			where: { id },
			include: {
				activities: {
					select: {
						id: true,
						createdAt: true
					}
				}
			}
		})
		const { activities, ...rest } = author

		return {
			...rest,
			activities: groupActivity(activities)
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
			throw new NotFoundException(`Book ${ErrorsEnum.Not_Found}`).getResponse()
		const ebook: {
			name: string
			content: {
				title: string
				content: string
			}[]
		}[] = await fetch(getFileUrl(book.ebook)).then(result => result.json())
		await this.prisma.activity.create({
			data: {
				type: ActivityEnum.Get_Ebook,
				book: {
					connect: {
						id
					}
				},
				user: {
					connect: {
						id: userId
					}
				}
			}
		})
		return {
			...book,
			file: ebook.map(({ content }) => {
				return content
					.map(
						({ title, content }) => `<label id="${title}"></label> ${content}`
					)
					.join(' ')
			}),
			chapters: ebook.map(({ name, content }) => {
				return {
					name,
					children: content.map(({ title }) => {
						return {
							title,
							link: `#${title}`
						}
					})
				}
			})
		}
	}

	async all(searchTerm: string, page: number) {
		const perPage = 20
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
			canLoadMore:
				page < Math.floor((await this.prisma.book.count()) / perPage),
			totalPages: Math.floor((await this.prisma.book.count()) / perPage)
		}
	}

	async toggleVisible(id: number) {
		const book = await this.getBookById(id, {
			visible: true
		})
		await this.prisma.book.update({
			where: { id: book.id },
			data: {
				visible: !book.visible
			}
		})
	}

	async create(dto: CreateBookDto) {
		const majorGenre = await this.prisma.genre.findMany({
			where: {
				id: {
					in: dto.genres
				}
			},
			select: {
				id: true
			},
			orderBy: {
				majorBooks: {
					_count: 'asc'
				}
			}
		})

		console.log(majorGenre, 'it is major genres')
		console.log(majorGenre)
		await this.prisma.book.create({
			data: {
				majorGenre: {
					connect: {
						id: majorGenre[0].id
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
				ebook: dto.ebook || book.ebook,
				author: dto.author || book.author,
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

	async feedback(userId: number, bookId: number, dto: FeedbackBookDto) {
		await this.usersService.getUserById(userId)
		await this.getBookById(bookId)
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
		if (!book) new NotFoundException('Book not found').getResponse()
		const genreIds = book.genres.map(g => g.id)
		const similarBooks = await this.prisma.book.findMany({
			where: {
				id: { not: +id },
				genres: { some: { id: { in: genreIds } } }
			},
			select: {
				...returnBookObject,
				genres: { select: ReturnGenreObject }
			}
		})
		await this.prisma.activity.create({
			data: {
				type: ActivityEnum.Visit_Book,
				user: {
					connect: {
						id: userId
					}
				},
				book: {
					connect: {
						id
					}
				}
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
