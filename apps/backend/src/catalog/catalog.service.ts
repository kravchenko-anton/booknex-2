import { Injectable } from '@nestjs/common'
import { returnBookObjectWithAuthor } from '../book/return.book.object'
import { PrismaService } from '../utils/prisma.service'
import { defaultReturnObject } from '../utils/return.default.object'

@Injectable()
export class CatalogService {
	constructor(private readonly prisma: PrismaService) {}

	async catalog(userId: number) {
		return {
			mostRelatedGenres: await this.getMostRelatedGenres(userId),
			recommendations: await this.getRecommendations(userId),
			popularNow: await this.getPopularBooks(),
			bestSellers: await this.getBestSellingBooks(),
			newReleases: await this.getNewReleases(),
			sameBreath: await this.getSameBreathBooks(),
			genres: await this.getGenres()
		}
	}

	async searchExamples() {
		const topGenres = await this.prisma.genre.findMany({
			take: 5,
			select: {
				id: true,
				name: true
			},
			orderBy: {
				books: {
					_count: 'desc'
				}
			}
		})
		const topBooks = await this.prisma.book.findMany({
			take: 6,
			select: {
				id: true,
				title: true
			},
			orderBy: {
				popularity: 'desc'
			}
		})
		return [
			...topGenres.slice(0, 2),
			...topBooks.slice(0, 3),
			...topGenres.slice(2, 3),
			...topBooks.slice(3, 5),
			...topGenres.slice(3, 5)
		]
	}

	// TODO: сделать тут поиск и сделать в поиске посмотреть больше
	search(query: string) {
		return this.prisma.book.findMany({
			select: {
				...returnBookObjectWithAuthor,
				likedPercentage: true,
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

	private async getMostRelatedGenres(userId: number) {
		const genres = await this.prisma.genre.findMany({
			select: {
				...defaultReturnObject,
				name: true
			},
			where: {
				OR: [
					{
						books: {
							some: {
								readingBy: {
									some: {
										id: userId
									}
								}
							}
						}
					},
					{
						name: {
							in: await this.getUserInitialGenres(userId)
						}
					}
				]
			}
		})

		return this.sortAndSliceGenres(genres)
	}

	private async getUserInitialGenres(userId: number) {
		return this.prisma.user
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
			.then(genres => genres.map(genre => genre.name))
	}

	private sortAndSliceGenres(
		genres: { id: number; createdAt: Date; updatedAt: Date; name: string }[]
	) {
		return genres
			.sort(
				(a, b) =>
					genres.filter(genre => genre.name === a.name).length -
					genres.filter(genre => genre.name === b.name).length
			)
			.slice(0, 5)
	}

	private getPopularBooks() {
		return this.prisma.book.findMany({
			take: 10,
			orderBy: {
				popularity: 'desc'
			},
			select: {
				...returnBookObjectWithAuthor,
				description: true,
				color: true
			},
			where: {
				histories: {
					some: {
						updatedAt: {
							gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
						}
					}
				}
			}
		})
	}

	private getBestSellingBooks() {
		return this.prisma.book.findMany({
			take: 10,
			orderBy: {
				popularity: 'desc'
			},
			select: returnBookObjectWithAuthor
		})
	}

	private getNewReleases() {
		return this.prisma.book.findMany({
			take: 10,
			orderBy: {
				updatedAt: 'desc'
			},
			select: returnBookObjectWithAuthor
		})
	}

	private getSameBreathBooks() {
		return this.prisma.book.findMany({
			take: 10,
			orderBy: {
				popularity: 'desc'
			},
			select: {
				...returnBookObjectWithAuthor,
				pages: true
			},
			where: {
				pages: {
					lte: 160
				}
			}
		})
	}

	private getGenres() {
		return this.prisma.genre.findMany({
			take: 5,
			select: {
				name: true,
				books: {
					orderBy: {
						updatedAt: 'desc'
					},
					take: 10,
					select: returnBookObjectWithAuthor
				}
			}
		})
	}

	private async getRecommendations(userId: number) {
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
				genre: {
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
