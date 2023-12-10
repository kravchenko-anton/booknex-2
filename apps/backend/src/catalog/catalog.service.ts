import { Injectable } from '@nestjs/common'
import {
	returnBookObjectWithAuthor,
	returnBookObjectWithPages,
	returnColorBookObjectWithAuthor
} from '../book/return.book.object'
import { ReturnGenreObject } from '../genre/return.genre.object'
import { PrismaService } from '../utils/prisma.service'
import { defaultReturnObject } from '../utils/return.default.object'

@Injectable()
export class CatalogService {
	constructor(private readonly prisma: PrismaService) {}
	async catalog(userId: number) {
		return {
			mostRelatedGenres: await this.MostRelatedGenres(userId),
			recommendations: await this.Recommendations(userId),
			popularNow: await this.PopularBooks(),
			bestSellers: await this.BestSellingBooks(),
			newReleases: await this.NewReleases(),
			sameBreath: await this.SameBreathBooks(),
			genres: await this.Genres()
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
			...topGenres.slice(0, 2).map(genre => ({
				id: genre.id,
				title: genre.name
			})),
			...topBooks.slice(0, 3),
			...topGenres.slice(2, 3).map(genre => ({
				id: genre.id,
				title: genre.name
			})),
			...topBooks.slice(3, 5),
			...topGenres.slice(3, 5).map(genre => ({
				id: genre.id,
				title: genre.name
			}))
		]
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

	private async MostRelatedGenres(userId: number) {
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
							in: await this.UserInitialGenres(userId)
						}
					}
				]
			}
		})

		return this.sortAndSliceGenres(genres)
	}

	private async UserInitialGenres(userId: number) {
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

	private sortAndSliceGenres(genres: { id: number; name: string }[]) {
		return genres
			.sort(
				(a, b) =>
					genres.filter(genre => genre.name === a.name).length -
					genres.filter(genre => genre.name === b.name).length
			)
			.slice(0, 5)
	}

	private PopularBooks() {
		return this.prisma.book.findMany({
			take: 10,
			orderBy: {
				popularity: 'desc'
			},
			select: returnColorBookObjectWithAuthor
		})
	}

	private BestSellingBooks() {
		return this.prisma.book.findMany({
			take: 10,
			orderBy: {
				popularity: 'desc'
			},
			select: returnBookObjectWithAuthor
		})
	}

	private NewReleases() {
		return this.prisma.book.findMany({
			take: 10,
			orderBy: {
				updatedAt: 'desc'
			},
			select: returnBookObjectWithAuthor
		})
	}

	private SameBreathBooks() {
		return this.prisma.book.findMany({
			take: 10,
			orderBy: {
				popularity: 'desc'
			},
			select: returnBookObjectWithPages,
			where: {
				pages: {
					lte: 160
				}
			}
		})
	}

	private Genres() {
		return this.prisma.genre.findMany({
			take: 5,
			select: {
				...ReturnGenreObject,
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

	private async Recommendations(userId: number) {
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
