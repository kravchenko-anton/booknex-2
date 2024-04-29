import { Activities } from '@/prisma/generated'
import { ActivityService } from '@/src/activity/activity.service'
import type { ShortBook } from '@/src/book/book.entity'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Inject, Injectable } from '@nestjs/common'
import * as cacheManagerType from 'cache-manager'
import { RecommendationService } from '../recommendation/recommendation.service'
import { PrismaService } from '../utils/services/prisma.service'

@Injectable()
export class CatalogService {
	constructor(
		private readonly activityService: ActivityService,
		private readonly prisma: PrismaService,
		private readonly recommendationService: RecommendationService,
		@Inject(CACHE_MANAGER) private cacheManager: cacheManagerType.Cache
	) {}

	search(query: string) {
		return this.prisma.book.findMany({
			where: {
				isPublic: true,
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

	async featured(userId: number) {
		await this.activityService.create({
			type: Activities.checkCatalog,
			importance: 1,
			userId: userId
		})

		const alreadyUsedBookSlugs: string[] = []
		const pushBooks = (books: ShortBook[]) => {
			alreadyUsedBookSlugs.push(...books.map(book => book.slug))
			return books
		}
		const userSelectedGenres =
			await this.recommendationService.userSelectedGenresById(userId)
		const booksBySelectedGenres = userSelectedGenres.map(genre =>
			this.prisma.book.findMany({
				take: 10,
				where: {
					isPublic: true,
					genres: {
						some: {
							slug: genre.slug
						}
					},
					slug: {
						notIn: alreadyUsedBookSlugs
					}
				}
			})
		)

		return {
			picksOfWeek:
				await this.picksOfTheWeek(alreadyUsedBookSlugs).then(pushBooks),
			genres: await this.prisma.genre.findMany({}),
			bestSellingBooks:
				await this.bestSellersBooks(alreadyUsedBookSlugs).then(pushBooks),
			newReleases: await this.newReleases(alreadyUsedBookSlugs).then(pushBooks),
			booksBySelectedGenres: await Promise.all(booksBySelectedGenres)
		}
	}

	async picksOfTheWeek(skippedBookSlugs: string[] = []) {
		const picksOfTheWeek: ShortBook[] | undefined =
			await this.cacheManager.get('picksOfTheWeek')
		if (picksOfTheWeek) return picksOfTheWeek
		const picks = await this.prisma.book.findMany({
			take: 10,
			where: {
				isPublic: true,
				slug: {
					notIn: skippedBookSlugs
				}
			},
			orderBy: {
				rating: 'desc'
			}
		})
		const timeToSave = 60 * 60 * 24 * 7 // 1 week
		await this.cacheManager.set('picksOfTheWeek', picks, timeToSave)
		return picks
	}

	private bestSellersBooks(skippedBookSlugs: string[] = []) {
		return this.prisma.book.findMany({
			take: 10,
			where: {
				isPublic: true,
				slug: {
					notIn: skippedBookSlugs
				}
			},
			orderBy: {
				rating: 'desc'
			}
		})
	}

	private newReleases(skippedBookSlugs: string[] = []) {
		return this.prisma.book.findMany({
			take: 10,
			where: {
				isPublic: true,
				slug: {
					notIn: skippedBookSlugs
				}
			},
			orderBy: {
				createdAt: 'desc'
			}
		})
	}
}
