import { Injectable } from '@nestjs/common'
import { Activities } from '@prisma/client'
import { BookService } from '../book/book.service'
import { GenreService } from '../genre/genre.service'
import { RecommendationService } from '../recommendation/recommendation.service'
import { ActivityService } from '../utils/services/activity/activity.service'

@Injectable()
export class CatalogService {
	constructor(
		private readonly activityService: ActivityService,
		private readonly bookService: BookService,
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
			//TODO: сделать тут исходя из реков списки
		}
	}

	search(query: string) {
		return this.bookService.findMany({
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
		return this.genreService.findMany({})
	}

	private popularBooks() {
		return this.bookService.findMany({
			take: 10,
			orderBy: {
				popularity: 'desc'
			}
		})
	}

	private bestSellingBooks() {
		return this.bookService.findMany({
			take: 10,
			orderBy: {
				popularity: 'desc'
			}
		})
	}

	private newReleases() {
		return this.bookService.findMany({
			take: 10,
			orderBy: {
				updatedAt: 'desc'
			}
		})
	}
}
