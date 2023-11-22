import { Injectable, NotFoundException } from '@nestjs/common'
import { returnAuthorObject } from '../author/return.author.object'
import { returnBookObjectWithAuthor } from '../book/return.book.object'
import { PrismaService } from '../utils/prisma.service'
import { defaultReturnObject } from '../utils/return.default.object'

@Injectable()
export class GenreService {
	constructor(private readonly prisma: PrismaService) {}

	all() {
		return this.prisma.genre.findMany()
	}

	async byId(id: number) {
		const genre = await this.prisma.genre.findUnique({
			where: {
				id: +id
			},
			select: {
				...defaultReturnObject,
				name: true,
				color: true,
				similar: {
					select: {
						id: true
					}
				}
			}
		})
		if (!genre) throw new NotFoundException('Genre not found').getResponse()
		const newestBooks = await this.prisma.book.findMany({
			take: 10,
			select: {
				...returnBookObjectWithAuthor,
				color: true,
				description: true
			},
			where: {
				genre: {
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
				genre: {
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
				books: {
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
			select: {
				...returnAuthorObject,
				picture: true
			},
			where: {
				books: {
					some: {
						genre: {
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
		return {
			...genre,
			similar: undefined,
			newestBooks,
			bestSellers,
			bestSellersFromSimilar,
			bestAuthors
		}
	}
}
