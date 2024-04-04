import { HttpStatus, Injectable } from '@nestjs/common'
import { Activities } from '@prisma/client'
import { adminErrors } from '../../../../libs/global/errors'
import { serverError } from '../utils/helpers/call-error'
import { ActivityService } from '../utils/services/activity/activity.service'
import { PrismaService } from '../utils/services/prisma.service'
import type { UpdateRecommendationDto } from './dto/update-recommendation.dto'

@Injectable()
export class RecommendationService {
	constructor(
		private prisma: PrismaService,
		private activityService: ActivityService
	) {}

	async recommendations(userId: number) {
		const selectedGenres = await this.prisma.user
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

		return this.prisma.book.findMany({
			take: 10,
			orderBy: { rating: 'desc' },
			where: {
				visible: true,
				genres: {
					some: {
						name: {
							in: selectedGenres.map(genre => genre.name)
						}
					}
				},
				AND: {
					NOT: {
						readingBy: {
							some: {
								id: userId
							}
						},
						finishedBy: {
							some: {
								id: userId
							}
						},
						savedBy: {
							some: {
								id: userId
							}
						}
					}
				}
			}
		})
	}

	currentRecommendation(userId: number) {
		return this.prisma.user
			.findUnique({
				where: {
					id: userId
				},
				select: {
					selectedGenres: {
						select: {
							id: true,
							name: true
						}
					}
				}
			})
			.selectedGenres()
	}

	async updateRecommendation(id: number, dto: UpdateRecommendationDto) {
		await this.checkUserExist(id)
		const selectedGenres = await this.prisma.genre.findMany({
			where: {
				slug: {
					in: dto.genres
				}
			},
			select: {
				id: true
			}
		})

		await this.activityService.create({
			type: Activities.updateRecommendations,
			importance: 5,
			userId: id
		})

		await this.prisma.user.update({
			where: { id },
			data: {
				selectedGenres: {
					set: selectedGenres
				}
			}
		})
	}

	private async checkUserExist(id: number) {
		const userExist = await this.prisma.user.findUnique({
			where: { id: id },
			select: {
				id: true
			}
		})
		if (!userExist)
			throw serverError(HttpStatus.BAD_REQUEST, adminErrors.userNotFound)
		return !!userExist
	}
}
