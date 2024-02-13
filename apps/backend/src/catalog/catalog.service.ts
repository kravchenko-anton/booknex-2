import { Injectable } from '@nestjs/common'
import { Activities } from '@prisma/client'
import { returnBookObject } from '../book/return.book.object'
import { PrismaService } from '../utils/prisma.service'

@Injectable()
export class CatalogService {
	constructor(private readonly prisma: PrismaService) {}

	async featured(userId: number) {
		await this.prisma.activity.create({
			data: {
				type: Activities.checkCatalog,
				importance: 1,
				user: {
					connect: {
						id: userId
					}
				}
			}
		})
		return {
			relatedGenres: await this.relatedGenres(),
			recommendations: await this.recommendations(userId),
			popularBooks: await this.popularBooks(),
			bestSellingBooks: await this.bestSellingBooks(),
			newReleases: await this.newReleases()
			//TODO: сделать тут исходя из реков списки
		}
	}

	// TODO: сделать тут поиск и сделать в поиске посмотреть больше
	search(query: string) {
		return this.prisma.book.findMany({
			select: {
				...returnBookObject,
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
							contains: query,
							mode: 'insensitive'
						}
					}
				]
			}
		})
	}

	private async relatedGenres() {
		return this.prisma.genre.findMany({})
	}

	private popularBooks() {
		return this.prisma.book.findMany({
			take: 10,
			orderBy: {
				popularity: 'desc'
			},
			select: returnBookObject
		})
	}

	private bestSellingBooks() {
		return this.prisma.book.findMany({
			take: 10,
			orderBy: {
				popularity: 'desc'
			},
			select: returnBookObject
		})
	}

	private newReleases() {
		return this.prisma.book.findMany({
			take: 10,
			orderBy: {
				updatedAt: 'desc'
			},
			select: returnBookObject
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
			select: returnBookObject,
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
													selectedGenres: {
														select: {
															name: true
														}
													}
												}
											})
											.selectedGenres()
											.then(selectedGenres =>
												selectedGenres?.map(genre => genre.name)
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
