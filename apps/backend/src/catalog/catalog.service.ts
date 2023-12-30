import { Injectable } from '@nestjs/common'
import {
	returnBookObjectWithAuthor,
	returnColorBookObjectWithAuthor
} from '../book/return.book.object'
import { PrismaService } from '../utils/prisma.service'

@Injectable()
export class CatalogService {
	constructor(private readonly prisma: PrismaService) {}

	async featured(userId: number) {
		return {
			relatedGenres: await this.relatedGenres(userId),
			recommendations: await this.recommendations(userId)
			//TODO: сделать тут исходя из реков списки
		}
	}

	async explore() {
		return {
			popularNow: await this.popularBooks(),
			bestSellers: await this.bestSellingBooks(),
			newReleases: await this.newReleases()
		}
	}

	// TODO: сделать тут поиск и сделать в поиске посмотреть больше
	search(query: string) {
		return this.prisma.book.findMany({
			select: {
				...returnBookObjectWithAuthor,
				pages: true
			},
			where: {
				OR: [
					{
						title: {
							mode: 'insensitive',
							contains: query
						}
					},
					{
						author: {
							name: {
								contains: query,
								mode: 'insensitive'
							}
						}
					}
				]
			}
		})
	}

	private async relatedGenres(userId: number) {
		return this.prisma.user
			.findUnique({
				where: {
					id: userId
				},
				select: {
					selectedGenre: {
						select: {
							id: true,
							name: true
						}
					}
				}
			})
			.selectedGenre()
	}

	private popularBooks() {
		return this.prisma.book.findMany({
			take: 10,
			orderBy: {
				popularity: 'desc'
			},
			select: returnColorBookObjectWithAuthor
		})
	}

	private bestSellingBooks() {
		return this.prisma.book.findMany({
			take: 10,
			orderBy: {
				popularity: 'desc'
			},
			select: returnBookObjectWithAuthor
		})
	}

	private newReleases() {
		return this.prisma.book.findMany({
			take: 10,
			orderBy: {
				updatedAt: 'desc'
			},
			select: returnBookObjectWithAuthor
		})
	}

	//TODO: пофиксить этот пиздец
	private async recommendations(userId: number) {
		const likedGenres = await this.prisma.genre.findMany({
			select: {
				name: true
			},
			where: {
				books: {
					some: {
						readingBy: {
							some: {
								id: userId
							}
						}
					}
				}
			}
		})
		const genres = likedGenres
			.sort(
				(a, b) =>
					likedGenres.filter(genre => genre.name === a.name).length -
					likedGenres.filter(genre => genre.name === b.name).length
			)
			.slice(0, 5)
			.map(genre => genre.name)
		return this.prisma.book.findMany({
			take: 10,
			orderBy: { popularity: 'desc' },
			select: returnBookObjectWithAuthor,
			where: {
				genres: {
					some: {
						name: {
							in:
								genres.length > 0
									? genres
									: await this.prisma.user
											.findUnique({
												where: {
													id: userId
												},
												select: {
													selectedGenre: {
														select: {
															name: true
														}
													}
												}
											})
											.selectedGenre()
											.then(initialGenres =>
												initialGenres.map(genre => genre.name)
											)
						}
					}
				},
				AND: {
					NOT: {
						readingBy: {
							some: {
								id: userId
							}
						}
					}
				}
			}
		})
	}
}
