import { HttpStatus, Injectable } from '@nestjs/common'
import { Activities } from '@prisma/client'
import { globalErrors } from 'global/errors'
import { returnBookObject } from '../book/return.book.object'
import { serverError } from '../utils/helpers/call-error'
import { ActivityService } from '../utils/services/activity/activity.service'
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

	// async setupGenre() {
	//   const genres = await this.prisma.genre.findMany();
	//   if (genres.length > 0) {
	//     throw serverError(HttpStatus.BAD_REQUEST, GenreErrors.genresAlreadyExist);
	//   }
	//
	//   await this.prisma.genre.createMany({
	//     data: setupGenres
	//   });
	// }

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
