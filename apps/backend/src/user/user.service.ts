import { ActivityService } from '@/src/activity/activity.service'
import type { ReadingHistory } from '@/src/user/user.dto'
import {
	userCatalogFields,
	userFinishReadingBookFields,
	userLibraryFields,
	userStartReadingBookFields,
	userToggleSaveFields
} from '@/src/user/user.fields'
import { days, isThisWeek, pepTalks } from '@/src/user/user.utils'
import { statisticReduce } from '@/src/utils/services/statisticReduce.service'
import { HttpStatus, Injectable } from '@nestjs/common'
import { Activities, type Prisma } from '@prisma/client'
import { globalErrors } from 'global/errors'
import { getTimeDate } from 'global/utils'
import { fromMinutesToMs, fromMsToMinutes } from 'global/utils/numberConvertor'
import { slugSelect } from '../utils/common/return.default.object'
import { serverError } from '../utils/helpers/server-error'
import { PrismaService } from '../utils/services/prisma.service'
import { returnUserObject } from './return.user.object'

@Injectable()
export class UserService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly activityService: ActivityService
	) {}

	async getUserById(id: number, selectObject: Prisma.UserSelect = {}) {
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

	async syncHistory(dto: ReadingHistory[], userId: number) {
		if (dto.length === 0) return
		await this.prisma.readingHistory.createMany({
			skipDuplicates: true,
			data: dto.map(history => ({
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
		})
	}

	async adjustGoal(userId: number, goal: number) {
		if (goal % 10 !== 0 || goal < 10 || goal > 180)
			throw serverError(HttpStatus.BAD_REQUEST, globalErrors.somethingWrong)
		await this.prisma.user.update({
			where: { id: userId },
			data: {
				goalMinutes: goal
			}
		})
	}
	async userStatistics(userId: number) {
		const user = await this.prisma.user.findUnique({
			where: { id: userId },
			select: {
				goalMinutes: true
			}
		})
		if (!user)
			throw serverError(HttpStatus.BAD_REQUEST, globalErrors.somethingWrong)
		const userHistory = await this.prisma.readingHistory.findMany({
			where: {
				userId
			},
			select: {
				endDate: true,
				progressDelta: true,
				readingTimeMs: true,
				bookSlug: true,
				startDate: true
			}
		})
		const currentDate = new Date()

		const userSteak = userHistory.reduce((streak, history, index) => {
			const historyDate = getTimeDate(history.endDate)
			return historyDate.getDate() === currentDate.getDate() - index &&
				historyDate.getMonth() === currentDate.getMonth() &&
				historyDate.getFullYear() === currentDate.getFullYear() &&
				fromMsToMinutes(history.readingTimeMs) >= user.goalMinutes
				? streak + 1
				: streak
		}, 0)

		const progressByCurrentWeek = Array.from({ length: 7 }, (_, index) => index)
			.map((_, index) => {
				const day = new Date()
				day.setDate(day.getDate() - ((day.getDay() + 7 - index) % 7))

				const dayHistory = userHistory
					.filter(history => isThisWeek(getTimeDate(history.endDate)))
					.filter(history => {
						const historyDate = getTimeDate(history.endDate)
						return (
							historyDate.getDate() === day.getDate() &&
							historyDate.getMonth() === day.getMonth() &&
							historyDate.getFullYear() === day.getFullYear()
						)
					})

				const dayReadingTime = dayHistory.reduce(
					(progress, history) => progress + history.readingTimeMs,
					0
				)
				const dayProgress =
					(dayReadingTime / fromMinutesToMs(user.goalMinutes)) * 100
				return {
					day: day.toLocaleDateString('en-US', {
						weekday: 'long'
					}),
					isCurrentDay: getTimeDate(day).getDate() === currentDate.getDate(),
					isReadMoreThatGoal:
						dayReadingTime >= fromMinutesToMs(user.goalMinutes),
					readingTimeMs: dayReadingTime,
					dayProgress: Math.min(dayProgress, 100)
				}
			})
			.sort((a, b) => days.indexOf(a.day) - days.indexOf(b.day))

		return {
			userSteak,
			progressByCurrentWeek,
			goalMinutes: user.goalMinutes,
			pepTalk:
				pepTalks.find(pepTalk => userSteak < pepTalk.lessThan)?.text ??
				'Good result, keep it up!'
		}
	}

	async library(userId: number) {
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

	async remove(id: number) {
		const user = await this.getUserById(id)
		await this.prisma.user.delete({
			where: { id: user.id }
		})
	}

	async startReading(userId: number, slug: string) {
		await this.checkBookExist(slug)
		const user = await this.getUserById(+userId, {
			readingBooks: slugSelect,
			finishedBooks: slugSelect
		})

		const isReadingExist = user.readingBooks.some(book => book.slug === slug)
		if (isReadingExist) return

		await this.activityService.create({
			type: Activities.startedReading,
			importance: 2,
			userId,
			bookSlug: slug
		})
		await this.prisma.user.update({
			where: { id: user.id },
			data: userStartReadingBookFields(slug)
		})
	}

	async finishReading(userId: number, slug: string) {
		await this.checkBookExist(slug)
		const user = await this.getUserById(+userId, {
			readingBooks: slugSelect
		})
		const isReadingExist = user.readingBooks.some(book => book.slug === slug)
		if (!isReadingExist) return

		await this.activityService.create({
			type: Activities.finishedReading,
			importance: 3,
			userId,
			bookSlug: slug
		})

		await this.prisma.user.update({
			where: { id: user.id },
			data: userFinishReadingBookFields(slug)
		})
	}

	async toggleSave(userId: number, slug: string) {
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

		await this.activityService.create({
			type: isSavedExist ? Activities.removeFromSaved : Activities.savedBook,
			importance: 1,
			userId,
			bookSlug: slug
		})
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

	public async isSaved(userId: number, slug: string) {
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
