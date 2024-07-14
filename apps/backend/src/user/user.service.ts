import { calculateUserStatistics } from '@/src/user/helpers/calculate-user-statistics'
import type { ReadingHistory } from '@/src/user/user.dto'
import {
	userCatalogFields,
	userFinishReadingBookFields,
	userLibraryFields,
	userRemoveFromLibraryFields,
	userStartReadingBookFields,
	userToggleSaveFields
} from '@/src/user/user.fields'
import { statisticReduce } from '@/src/utils/services/statisticReduce.service'
import { HttpStatus, Injectable } from '@nestjs/common'
import type { Prisma } from '@prisma/client'
import { globalErrors } from 'global/errors'
import { slugSelect } from '../utils/common/return.default.object'
import { serverError } from '../utils/helpers/server-error'
import { PrismaService } from '../utils/services/prisma.service'
import { returnUserObject } from './return.user.object'

export interface SyncHistoryType {
	readingTimeMs: number
	endDate: Date
	progressDelta: number
	startProgress: number
	endProgress: number
	scrollPosition: number
	startDate: Date
	userId: string
	bookSlug: string
}
@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {}

	async getUserById(id: string, selectObject: Prisma.UserSelect = {}) {
		const user = await this.prisma.user.findUnique({
			where: { id },
			select: {
				...returnUserObject,
				...selectObject
			}
		})
		if (!user) {
			throw serverError(HttpStatus.BAD_REQUEST, globalErrors.somethingWrong)
		}
		return user
	}

	async syncHistory(dto: ReadingHistory[], userId: string) {
		if (dto.length === 0) return
		console.log(
			'syncHistory',
			dto.map(history => ({
				readingTimeMs: history.readingTimeMs,
				endDate: new Date(history.endDate),
				progressDelta: history.progressDelta,
				startProgress: history.startProgress,
				endProgress: history.endProgress,
				scrollPosition: history.scrollPosition,
				startDate: new Date(history.startDate),
				userId: userId,
				bookSlug: history.bookSlug
			})),
			'🔵',
			dto
				.map(history => ({
					readingTimeMs: history.readingTimeMs,
					endDate: new Date(history.endDate),
					progressDelta: history.progressDelta,
					startProgress: history.startProgress,
					endProgress: history.endProgress,
					scrollPosition: history.scrollPosition,
					startDate: new Date(history.startDate),
					userId: userId,
					bookSlug: history.bookSlug
				}))
				.reduce<SyncHistoryType[]>((accumulator, history) => {
					const lastElement = accumulator.at(-1)
					if (
						lastElement &&
						Math.abs(
							lastElement.startDate.getTime() - history.startDate.getTime()
						) <
							1000 * 60 * 60 * 24
					) {
						lastElement.readingTimeMs += history.readingTimeMs
						lastElement.endProgress = history.endProgress
						lastElement.progressDelta += history.progressDelta
						return accumulator
					}
					return [...accumulator, history]
				}, [])
		)
		await this.prisma.readingHistory.createMany({
			skipDuplicates: true,
			data: dto
				.map(history => ({
					readingTimeMs: history.readingTimeMs,
					endDate: new Date(history.endDate),
					progressDelta: history.progressDelta,
					startProgress: history.startProgress,
					endProgress: history.endProgress,

					scrollPosition: history.scrollPosition,
					startDate: new Date(history.startDate),
					userId: userId,
					bookSlug: history.bookSlug
				}))
				//TODO: мейби поправить, может не так работать
				.reduce<SyncHistoryType[]>((accumulator, history) => {
					const lastElement = accumulator.at(-1)
					if (
						lastElement &&
						Math.abs(
							lastElement.startDate.getTime() - history.startDate.getTime()
						) <
							1000 * 60 * 60 * 24
					) {
						lastElement.readingTimeMs += history.readingTimeMs
						lastElement.endProgress = history.endProgress
						lastElement.progressDelta += history.progressDelta
						return accumulator
					}
					return [...accumulator, history]
				}, [])
		})
	}

	async adjustGoal(userId: string, goal: number) {
		if (goal % 10 !== 0 || goal < 10 || goal > 180)
			throw serverError(HttpStatus.BAD_REQUEST, globalErrors.somethingWrong)
		await this.prisma.user.update({
			where: { id: userId },
			data: {
				goalMinutes: goal
			}
		})
	}
	async userStatistics(userId: string) {
		const user = await this.prisma.user.findUnique({
			where: { id: userId },
			select: {
				goalMinutes: true
			}
		})
		if (!user)
			throw serverError(HttpStatus.BAD_REQUEST, globalErrors.somethingWrong)
		const userHistory = await this.prisma.readingHistory.findMany({
			where: { userId },
			select: {
				endDate: true,
				progressDelta: true,
				readingTimeMs: true,
				bookSlug: true,
				startDate: true
			}
		})
		const { userSteak, progressByCurrentWeek, pepTalk } =
			calculateUserStatistics({ userHistory, goalMinutes: user.goalMinutes })

		return {
			userSteak,
			pepTalk,
			progressByCurrentWeek,
			goalMinutes: user.goalMinutes
		}
	}

	async library(userId: string) {
		const library = await this.prisma.user.findUnique(userLibraryFields(userId))
		if (!library)
			throw serverError(HttpStatus.BAD_REQUEST, globalErrors.somethingWrong)
		const { readingBooks, finishedBooks, savedBooks } = library
		return {
			readingBooks: readingBooks
				.map(book => {
					const latestHistory = book.readingHistory[0] ?? null
					return {
						...book,
						readingHistory: {
							scrollPosition: latestHistory?.scrollPosition ?? 0,
							endDate: latestHistory?.endDate,
							progress: latestHistory?.endProgress ?? 0
						}
					}
				})
				.sort(
					(a, b) =>
						(b.readingHistory?.endDate?.getTime() ?? 0) -
						(a.readingHistory?.endDate?.getTime() ?? 0)
				),
			finishedBooks,
			savedBooks
		}
	}

	async catalog(searchTerm: string, page: number) {
		const perPage = 20
		const data = await this.prisma.user.findMany(
			userCatalogFields({ page, perPage, searchTerm })
		)
		const userCount = await this.prisma.user.count()
		return {
			data: data.map(({ readingHistory, ...user }) => ({
				...user,
				statistics: statisticReduce({
					statistics: readingHistory.map(({ book, ...history }) => ({
						...history,
						pagesCount: book.pagesCount
					})),
					initialDate: user.createdAt
				})
			})),
			canLoadMore: page < Math.floor(userCount / perPage),
			totalPages: Math.floor(userCount / perPage)
		}
	}

	async remove(id: string) {
		const user = await this.getUserById(id)
		await this.prisma.user.delete({
			where: { id: user.id }
		})
	}

	async startReading(userId: string, slug: string) {
		await this.checkBookExist(slug)
		const user = await this.getUserById(userId, {
			readingBooks: slugSelect,
			finishedBooks: slugSelect
		})

		const isReadingExist = user.readingBooks.some(book => book.slug === slug)
		if (isReadingExist) return

		await this.prisma.user.update({
			where: { id: user.id },
			data: userStartReadingBookFields(slug)
		})
	}
	async removeFromLibrary(userId: string, slug: string) {
		await this.checkBookExist(slug)
		const user = await this.getUserById(userId, {
			readingBooks: slugSelect,
			finishedBooks: slugSelect,
			savedBooks: slugSelect
		})

		await this.prisma.user.update({
			where: { id: user.id },
			data: userRemoveFromLibraryFields(slug)
		})
	}

	async finishReading(userId: string, slug: string) {
		await this.checkBookExist(slug)
		const user = await this.getUserById(userId, {
			readingBooks: slugSelect
		})
		const isReadingExist = user.readingBooks.some(book => book.slug === slug)
		if (!isReadingExist) return

		await this.prisma.user.update({
			where: { id: user.id },
			data: userFinishReadingBookFields(slug)
		})
	}

	async toggleSave(userId: string, slug: string) {
		await this.checkBookExist(slug)
		const user = await this.prisma.user.findUnique({
			where: { id: userId },
			select: {
				id: true,
				savedBooks: slugSelect
			}
		})
		if (!user)
			throw serverError(HttpStatus.BAD_REQUEST, globalErrors.somethingWrong)
		const isSavedExist = user.savedBooks.some(book => book.slug === slug)

		await this.prisma.user.update({
			where: { id: user.id },
			data: userToggleSaveFields({
				slug,
				isSavedExist
			})
		})

		return !isSavedExist
	}

	private async checkBookExist(slug: string) {
		const book = await this.prisma.book.findUnique({
			where: { slug, isPublic: true },
			select: {
				id: true,
				title: true
			}
		})
		if (!book)
			throw serverError(HttpStatus.BAD_REQUEST, globalErrors.somethingWrong)
		return !!book
	}

	public async isSaved(userId: string, slug: string) {
		await this.checkBookExist(slug)
		const user = await this.prisma.user.findUnique({
			where: { id: userId },
			select: {
				id: true,
				savedBooks: slugSelect
			}
		})
		if (!user)
			throw serverError(HttpStatus.BAD_REQUEST, globalErrors.somethingWrong)
		return user.savedBooks.some(book => book.slug === slug)
	}
}
