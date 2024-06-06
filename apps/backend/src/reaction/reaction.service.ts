import { serverError } from '@/src/utils/helpers/server-error'
import { PrismaService } from '@/src/utils/services/prisma.service'
import { HttpStatus, Injectable } from '@nestjs/common'
import type { CreateReaction } from 'global/api-client'
import { globalErrors } from 'global/errors'

@Injectable()
export class ReactionService {
	constructor(private readonly prisma: PrismaService) {}
	async create(userId: number, createReactionDto: CreateReaction) {
		const isUserExist = await this.prisma.user.findUnique({
			where: { id: userId }
		})
		if (!isUserExist) {
			throw serverError(HttpStatus.BAD_REQUEST, globalErrors.somethingWrong)
		}
		return this.prisma.reaction.create({
			data: {
				userId,
				...createReactionDto
			}
		})
	}

	async reactionByBook(bookSlug: string, userId: number) {
		const isUserExist = await this.prisma.user.findUnique({
			where: { id: userId }
		})
		if (!isUserExist) {
			throw serverError(HttpStatus.BAD_REQUEST, globalErrors.somethingWrong)
		}
		return this.prisma.reaction.findMany({
			where: {
				bookSlug,
				userId
			},
			select: {
				id: true,
				text: true,
				endOffset: true,
				startOffset: true,
				xpath: true,
				type: true
			}
		})
	}

	async reactionList(userId: number) {
		const isUserExist = await this.prisma.user.findUnique({
			where: { id: userId }
		})
		if (!isUserExist) {
			throw serverError(HttpStatus.BAD_REQUEST, globalErrors.somethingWrong)
		}
		return this.prisma.reaction.findMany({
			where: {
				userId
			},
			select: {
				id: true,
				book: {
					select: {
						title: true,
						slug: true,
						picture: true,
						author: true
					}
				},
				createdAt: true,
				text: true,
				type: true
			}
		})
	}

	async remove(id: number, userId: number) {
		const isUserExist = await this.prisma.user.findUnique({
			where: { id: userId }
		})
		if (!isUserExist) {
			throw serverError(HttpStatus.BAD_REQUEST, globalErrors.somethingWrong)
		}
		return this.prisma.reaction.delete({
			where: {
				id,
				userId
			}
		})
	}
}
