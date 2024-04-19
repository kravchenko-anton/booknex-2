import { Activities } from '@/prisma/generated'
import { ActivityService } from '@/src/activity/activity.service'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Inject, Injectable } from '@nestjs/common'
import * as cacheManagerType from 'cache-manager'
import type { ShortBook } from 'global/api-client'
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

	async featured(userId: number) {
		await this.activityService.create({
			type: Activities.checkCatalog,
			importance: 1,
			userId: userId
		})
		return {
			interestedGenres: await this.interestedGenres(userId),
			recommendation: await this.recommendationService.recommendation(userId),
			popularBooks: await this.popularBooks(),
			bestSellingBooks: await this.bestSellingBooks(),
			newReleases: await this.newReleases()
		}
	}

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

	async picksOfTheWeek() {
		const picksOfTheWeek: ShortBook[] | undefined =
			await this.cacheManager.get('picksOfTheWeek')
		if (picksOfTheWeek) return picksOfTheWeek
		const picks = await this.prisma.book.findMany({
			take: 10,
			where: {
				isPublic: true
			},
			orderBy: {
				rating: 'desc'
			}
		})
		const timeToSave = 60 * 60 * 24 * 7 // 1 week
		await this.cacheManager.set('picksOfTheWeek', picks, timeToSave)
		return picks
	}

	private async interestedGenres(userId: number) {
		return this.prisma.genre.findMany({
			where: {
				users: {
					every: {
						id: userId
					}
				}
			}
		})
	}

	private popularBooks() {
		return this.prisma.book.findMany({
			take: 10,
			where: {
				isPublic: true
			},
			orderBy: {
				rating: 'desc'
			}
		})
	}

	private bestSellingBooks() {
		return this.prisma.book.findMany({
			take: 10,
			where: {
				isPublic: true
			},
			orderBy: {
				rating: 'desc'
			}
		})
	}

	private newReleases() {
		return this.prisma.book.findMany({
			take: 10,
			where: {
				isPublic: true
			},
			orderBy: {
				updatedAt: 'desc'
			}
		})
	}
}
