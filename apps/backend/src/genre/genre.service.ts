import { Activities } from '@/prisma/generated'
import { ActivityService } from '@/src/activity/activity.service'
import { HttpStatus, Injectable } from '@nestjs/common'
import { globalErrors } from 'global/errors'
import { returnBookObject } from '../book/return.book.object'
import { serverError } from '../utils/helpers/server-error'
import { PrismaService } from '../utils/services/prisma.service'
import { ReturnGenreObject } from './return.genre.object'

@Injectable()
export class GenreService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly activityService: ActivityService
	) {}

	catalog() {
		return this.prisma.genre.findMany({
			select: ReturnGenreObject
		})
	}

	async bySlug(slug: string, userId: number) {
		await this.activityService.create({
			type: Activities.visitGenre,
			importance: 1,
			userId
		})

		const genre = await this.prisma.genre.findUnique({
			where: {
				slug
			},
			select: {
				...ReturnGenreObject,
				mainBooks: {
					select: returnBookObject
				}
			}
		})
		if (!genre)
			throw serverError(HttpStatus.BAD_REQUEST, globalErrors.somethingWrong)
		return genre
	}
}
