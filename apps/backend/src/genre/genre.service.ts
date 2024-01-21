import { Injectable, NotFoundException } from '@nestjs/common'
import { ErrorsEnum } from '../utils/errors'
import { PrismaService } from '../utils/prisma.service'
import { ReturnGenreObject } from './return.genre.object'

@Injectable()
export class GenreService {
	constructor(private readonly prisma: PrismaService) {}

	all() {
		return this.prisma.genre.findMany({
			select: {
				...ReturnGenreObject,
				color: true
			}
		})
	}

	async byId(id: number, userId: number) {
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
			throw new NotFoundException(`Genre ${ErrorsEnum.Not_Found}`).getResponse()
		return genre
	}
}
