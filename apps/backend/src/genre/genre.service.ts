import { HttpStatus, Injectable } from '@nestjs/common'
import { Activities } from '@prisma/client'
import { ActivityService } from '../activity/activity.service'
import { serverError } from '../utils/call-error'
import { GlobalErrorsEnum } from '../utils/errors'
import { PrismaService } from '../utils/prisma.service'
import { ReturnGenreObject } from './return.genre.object'

@Injectable()
export class GenreService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly activityService: ActivityService
	) {}

	all() {
		return this.prisma.genre.findMany({
			select: {
				...ReturnGenreObject
			}
		})
	}

	async getPopular() {
		return this.prisma.genre.findMany({
			take: 3,
			select: {
				id: true
			},
			orderBy: {
				activities: {
					_count: 'asc'
				}
			}
		})
	}

	async byId(id: number, userId: number) {
		await this.activityService.create({
			type: Activities.visitGenre,
			importance: 1,
			userId
		})
		const genre = await this.prisma.genre.findUnique({
			where: {
				id: +id
			},
			select: {
				...ReturnGenreObject,
				majorBooks: {
					select: {
						id: true,
						title: true,
						picture: true
					}
				}
			}
		})
		if (!genre)
			throw serverError(HttpStatus.BAD_REQUEST, GlobalErrorsEnum.somethingWrong)
		return genre
	}
}
