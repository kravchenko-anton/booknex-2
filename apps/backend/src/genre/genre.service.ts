import { HttpStatus, Injectable } from '@nestjs/common'
import { Activities } from '@prisma/client'
import { serverError } from '../utils/call-error'
import { GlobalErrorsEnum } from '../utils/errors'
import { PrismaService } from '../utils/prisma.service'
import { ReturnGenreObject } from './return.genre.object'

@Injectable()
export class GenreService {
	constructor(private readonly prisma: PrismaService) {}

	all() {
		return this.prisma.genre.findMany({
			select: {
				...ReturnGenreObject
			}
		})
	}

	async byId(id: number, userId: number) {
		await this.prisma.activity.create({
			data: {
				type: Activities.visitGenre,
				importance: 1,
				user: {
					connect: {
						id: userId
					}
				},
				genre: {
					connect: {
						id
					}
				}
			}
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
