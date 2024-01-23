import { Injectable, NotFoundException } from '@nestjs/common'
import { ActivityEnum } from '../user/user.types'
import { ErrorsEnum } from '../utils/errors'
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
				type: ActivityEnum.Visit_Genre,
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
			throw new NotFoundException(`Genre ${ErrorsEnum.Not_Found}`).getResponse()
		return genre
	}
}
