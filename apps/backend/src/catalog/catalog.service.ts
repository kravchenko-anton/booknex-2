import { Injectable } from '@nestjs/common'
import { Activities } from '@prisma/client'
import { RecommendationService } from '../recommendation/recommendation.service'
import { ActivityService } from '../utils/services/activity/activity.service'
import { PrismaService } from '../utils/services/prisma.service'

@Injectable()
export class CatalogService {
	constructor(
		private readonly activityService: ActivityService,
		private readonly prisma: PrismaService,
		private readonly recommendationService: RecommendationService
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
