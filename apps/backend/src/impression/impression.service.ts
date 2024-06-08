import { HttpStatus, Injectable } from '@nestjs/common'
import { adminErrors, globalErrors } from 'global/errors'
import { serverError } from '../utils/helpers/server-error'
import { PrismaService } from '../utils/services/prisma.service'
import type { ImpressionDto } from './impression.dto'

@Injectable()
export class ImpressionService {
	constructor(private readonly prisma: PrismaService) {}

	async impression(userId: number, bookSlug: string, dto: ImpressionDto) {
		await this.checkBookExist(bookSlug)

		await this.checkUserExist(userId)
		await this.prisma.impression.create({
			data: {
				rating: dto.rating,
				tags: dto.tags,
				text: dto.comment,
				user: {
					connect: {
						id: userId
					}
				},
				book: {
					connect: {
						slug: bookSlug
					}
				}
			}
		})
	}

	private async checkBookExist(slug: string) {
		const book = await this.prisma.book.findUnique({
			where: { slug, isPublic: true },
			select: {
				id: true
			}
		})
		if (!book)
			throw serverError(HttpStatus.BAD_REQUEST, globalErrors.unknownError)
		return !!book
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
