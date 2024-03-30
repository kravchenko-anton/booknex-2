import { HttpStatus, Injectable } from '@nestjs/common'
import { Activities } from '@prisma/client'
import { adminErrors, globalErrors } from '../../../../libs/global/errors'
import { serverError } from '../utils/helpers/call-error'
import { ActivityService } from '../utils/services/activity/activity.service'
import { PrismaService } from '../utils/services/prisma.service'
import type { ReviewBookDto } from './dto/review.book.dto'

@Injectable()
export class ReviewService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly activityService: ActivityService
	) {}

	async review(userId: number, bookSlug: string, dto: ReviewBookDto) {
		await this.checkBookExist(bookSlug)
		await this.checkUserExist(userId)
		await this.activityService.create({
			type: Activities.reviewBook,
			importance: 4,
			userId,
			bookSlug
		})
		await this.prisma.review.create({
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
			where: { slug, visible: true },
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
