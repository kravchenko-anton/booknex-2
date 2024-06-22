import { ReturnGenreObject } from '@/src/genre/return.genre.object'
import { HttpStatus, Injectable } from '@nestjs/common'
import { adminErrors } from 'global/errors'
import { serverError } from '../utils/helpers/server-error'
import { PrismaService } from '../utils/services/prisma.service'
import type { UpdateRecommendationDto } from './recommendation.dto'

@Injectable()
export class RecommendationService {
	constructor(private prisma: PrismaService) {}

	async userSelectedGenresById(userId: string) {
		const userSelectedGenres = await this.prisma.user.findUnique({
			where: {
				id: userId
			},
			select: {
				selectedGenres: {
					select: ReturnGenreObject
				}
			}
		})
		return userSelectedGenres?.selectedGenres || []
	}

	async updateSelectedGenres(id: string, dto: UpdateRecommendationDto) {
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

		await this.prisma.user.update({
			where: { id },
			data: {
				selectedGenres: {
					set: selectedGenres
				}
			}
		})
	}

	private async checkUserExist(id: string) {
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
