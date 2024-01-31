import { Injectable, NotFoundException } from '@nestjs/common'
import type { Prisma } from '@prisma/client'
import { getFileUrl } from '../../../../libs/global/api-config'
import { ReturnGenreObject } from '../genre/return.genre.object'
import { UserService } from '../user/user.service'
import { ActivityEnum } from '../user/user.types'
import { ErrorsEnum } from '../utils/errors'
import { formatYYYYMMDD } from '../utils/format-date'
import { PrismaService } from '../utils/prisma.service'
import { defaultReturnObject } from '../utils/return.default.object'
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
						user: {
							select: {
								id: true,
								email: true
							}
						},
						id: true,
						importance: true,
						createdAt: true
					}
				}
			}
		})
		const { activities, ...rest } = author
		const activitiesByDate = activities.reduce<
			Record<
				string,
				{
					date: string
					activities: {
						message: string
						importance: number
					}[]
					count: number
				}
			>
		>((accumulator, activity) => {
			const date = formatYYYYMMDD(activity.createdAt)
			accumulator[date] = accumulator[date] || {
				date,
				count: 0,
				activities: []
			}
			accumulator[date].activities.push({
				importance: activity.importance,
				message: `${new Date(
					activity.createdAt
				).getHours()}:${new Date(activity.createdAt).getMinutes()} ${activity.type}`
			})
			accumulator[date].count++
			return accumulator
		}, {})

		const activitiesWithLevel = Object.values(activitiesByDate).map(
			({ activities, count, date }) => ({
				date,
				count,
				level: Math.round(
					activities.reduce(
						(accumulator, { importance }) => accumulator + importance,
						0
					) / activities.length
				),
				activities: activities.map(({ message }) => message)
			})
		)

		return {
			...rest,
			activities: activitiesWithLevel
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
				importance: 1,
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
			},
			take: 1
		})

		console.log(majorGenre, 'it is major genres')

		await this.prisma.book.create({
			data: {
				majorGenre: {
					connect: {
						id: majorGenre[0].id
					}
				},
				activities: {
					create: {
						type: ActivityEnum.Create_Book,
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
		await this.prisma.book.delete({ where: { id: book.id } })
	}

	//TODO: сделать запрос более гипким
	async update(id: number, dto: EditBookDto) {
		console.log(dto, 'it is dto')
		const book = await this.prisma.book.findUnique({
			where: { id },
			select: {
				id: true,
				title: true,
				popularity: true,
				pages: true,
				description: true,
				picture: true,
				ebook: true,
				author: true,
				genres: {
					select: {
						id: true
					}
				}
			}
		})
		if (!book) throw new NotFoundException('Book not found').getResponse()
		const { genres: dtoGenres, ...other } = dto

		const majorGenre = await this.prisma.genre.findMany({
			where: {
				id: {
					in: dtoGenres
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

		console.log(other, 'it is major genres')
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

		await this.prisma.activity.create({
			data: {
				type: ActivityEnum.Update_Book,
				importance: 9,
				book: {
					connect: {
						id: book.id
					}
				}
			}
		})
	}

	async feedback(userId: number, bookId: number, dto: FeedbackBookDto) {
		await this.usersService.getUserById(userId)
		await this.getBookById(bookId)
		await this.prisma.activity.create({
			data: {
				type: ActivityEnum.Feedback_Book,
				importance: 4,
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
				importance: 1,
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
