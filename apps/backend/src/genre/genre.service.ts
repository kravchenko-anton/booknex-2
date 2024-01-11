import { Injectable, NotFoundException } from '@nestjs/common'
import { returnAuthorWithPicture } from '../author/return.author.object'
import { returnBookObjectWithAuthor } from '../book/return.book.object'
import { ActivityEnum } from '../user/user.types'
import { ErrorsEnum } from '../utils/errors'
import { PrismaService } from '../utils/prisma.service'
import { defaultReturnObject } from '../utils/return.default.object'
import { ReturnGenreObject } from './return.genre.object'

@Injectable()
export class GenreService {
	constructor(private readonly prisma: PrismaService) {}

	all() {
		return this.prisma.genre.findMany({
			select: {
				...ReturnGenreObject,
				color: true
			}
		})
	}

	async byId(id: number) {
		const genre = await this.prisma.genre.findUnique({
			where: {
				id: +id
			},
			select: {
				...ReturnGenreObject,
				color: true,
				similar: {
					select: {
						id: true
					}
				}
			}
		})
		if (!genre)
			throw new NotFoundException(`Genre ${ErrorsEnum.Not_Found}`).getResponse()
		const newestBooks = await this.prisma.book.findMany({
			take: 10,
			select: {
				...returnBookObjectWithAuthor,
				color: true,
				description: true
			},
			where: {
				majorGenre: {
					id: +id
				}
			},
			orderBy: {
				createdAt: 'desc'
			}
		})

		const bestSellers = await this.prisma.book.findMany({
			take: 10,
			select: returnBookObjectWithAuthor,
			where: {
				majorGenre: {
					id: +id
				}
			},
			orderBy: {
				popularity: 'desc'
			}
		})

		const bestSellersFromSimilar = await this.prisma.genre.findMany({
			where: {
				id: {
					in: genre.similar.map(g => g.id)
				}
			},
			select: {
				...defaultReturnObject,
				name: true,
				majorBooks: {
					select: returnBookObjectWithAuthor,
					take: 10,
					orderBy: {
						popularity: 'desc'
					}
				}
			}
		})
		const bestAuthors = await this.prisma.author.findMany({
			take: 10,
			select: returnAuthorWithPicture,
			where: {
				books: {
					some: {
						majorGenre: {
							id: +id
						}
					}
				}
			},
			orderBy: {
				books: {
					_count: 'desc'
				}
			}
		})

		await this.prisma.activity.create({
			data: {
				type: ActivityEnum.Visit_Genre,
				user: {
					connect: {
						id
					}
				},
				Genre: {
					connect: {
						id
					}
				}
			}
		})
		const { similar, ...rest } = genre
		return {
			...rest,
			newestBooks,
			bestSellers,
			bestSellersFromSimilar,
			bestAuthors
		}
	}
}
