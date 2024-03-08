import { Injectable } from '@nestjs/common'
import { Activities } from '@prisma/client'
import { GenreService } from '../genre/genre.service'
import { RecommendationService } from '../recommendation/recommendation.service'
import { ActivityService } from '../utils/services/activity/activity.service'
import { PrismaService } from '../utils/services/prisma.service'

@Injectable()
export class CatalogService {
	constructor(
		private readonly activityService: ActivityService,
		private readonly prisma: PrismaService,
		private readonly recommendationService: RecommendationService,
		private readonly genreService: GenreService
	) {}

	async featured(userId: number) {
		await this.activityService.create({
			type: Activities.checkCatalog,
			importance: 1,
			userId: userId
		})
		return {
			relatedGenres: await this.relatedGenres(),
			recommendations: await this.recommendationService.recommendations(userId),
			popularBooks: await this.popularBooks(),
			bestSellingBooks: await this.bestSellingBooks(),
			newReleases: await this.newReleases()
		}
	}

	search(query: string) {
		return this.prisma.book.findMany({
			where: {
				visible: true,
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
		return this.genreService.findMany({})
	}

	private popularBooks() {
		return this.prisma.book.findMany({
			take: 10,
			where: {
				visible: true
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
				visible: true
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
				visible: true
			},
			orderBy: {
				updatedAt: 'desc'
			}
		})
	}
}
