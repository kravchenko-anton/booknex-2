import type { UpdateReaction } from '@/src/reaction/reaction.dto'
import { serverError } from '@/src/utils/helpers/server-error'
import { PrismaService } from '@/src/utils/services/prisma.service'
import { HttpStatus, Injectable } from '@nestjs/common'
import type { CreateReaction } from 'global/api-client'
import { globalErrors } from 'global/errors'

@Injectable()
export class ReactionService {
	constructor(private readonly prisma: PrismaService) {}
	async create(userId: string, createReactionDto: CreateReaction) {
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

	async update(userId: string, updateReactionDto: UpdateReaction) {
		const reaction = await this.prisma.reaction.findUnique({
			where: { id: updateReactionDto.id }
		})
		if (!reaction) {
			throw serverError(HttpStatus.BAD_REQUEST, globalErrors.somethingWrong)
		}
		const isUserExist = await this.prisma.user.findUnique({
			where: { id: userId }
		})
		if (!isUserExist) {
			throw serverError(HttpStatus.BAD_REQUEST, globalErrors.somethingWrong)
		}
		return this.prisma.reaction.update({
			where: {
				id: updateReactionDto.id
			},
			data: updateReactionDto
		})
	}

	async reactionByBook(bookSlug: string, userId: string) {
		const isUserExist = await this.prisma.user.findUnique({
			where: { id: userId }
		})
		if (!isUserExist) {
			throw serverError(HttpStatus.BAD_REQUEST, globalErrors.somethingWrong)
		}
		return this.prisma.reaction.findMany({
			where: {
				bookSlug,
				userId,
				book: {
					isPublic: true
				}
			},
			select: {
				id: true,
				text: true,
				createdAt: true,
				endOffset: true,
				startOffset: true,
				xpath: true,
				type: true
			}
		})
	}

	async reactionList(userId: string) {
		const isUserExist = await this.prisma.user.findUnique({
			where: { id: userId }
		})
		if (!isUserExist) {
			throw serverError(HttpStatus.BAD_REQUEST, globalErrors.somethingWrong)
		}
		const reactionsCount = await this.prisma.reaction.groupBy({
			by: ['bookSlug'],
			_count: {
				id: true
			},
			orderBy: {
				_count: {
					id: 'desc'
				}
			},
			where: {
				userId,
				book: {
					isPublic: true
				}
			}
		})
		const bookSlugs = reactionsCount.map(reaction => reaction.bookSlug)
		const books = await this.prisma.book.findMany({
			where: {
				slug: {
					in: bookSlugs
				},
				isPublic: true
			},
			select: {
				picture: true,
				title: true,
				slug: true,
				author: true
			}
		})
		return reactionsCount.map(reaction => {
			const book = books.find(book => book.slug === reaction.bookSlug)
			if (!book) return
			return {
				...book,
				count: reaction._count.id
			}
		})
	}

	async remove(id: string, userId: string) {
		const reactionById = await this.prisma.reaction.findUnique({
			where: { id }
		})
		if (!reactionById) {
			throw serverError(HttpStatus.BAD_REQUEST, globalErrors.somethingWrong)
		}
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
