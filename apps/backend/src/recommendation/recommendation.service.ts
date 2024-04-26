import { Activities } from '@/prisma/generated'
import { ActivityService } from '@/src/activity/activity.service'
import { HttpStatus, Injectable } from '@nestjs/common'
import { adminErrors } from 'global/errors'
import { serverError } from '../utils/helpers/server-error'
import { PrismaService } from '../utils/services/prisma.service'
import type { UpdateRecommendationDto } from './dto/update-recommendation.dto'

@Injectable()
export class RecommendationService {
	constructor(
		private prisma: PrismaService,
		private activityService: ActivityService
	) {}

	async userSelectedGenresById(userId: number) {
		const userSelectedGenres = await this.prisma.user.findUnique({
			where: {
				id: userId
			},
			select: {
				selectedGenres: {
					select: {
						slug: true,
						name: true
					}
				}
			}
		})
		return userSelectedGenres?.selectedGenres || []
	}

	async updateSelectedGenres(id: number, dto: UpdateRecommendationDto) {
		await this.checkUserExist(id)
		const selectedGenres = await this.prisma.genre.findMany({
			where: {
				slug: {
					in: dto.genreSlugs
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
