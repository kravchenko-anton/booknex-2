import { ActivityService } from '@/src/activity/activity.service'
import type { ReadingHistory } from '@/src/user/user.model'
import { HttpStatus, Injectable } from '@nestjs/common'
import { Activities, type Prisma } from '@prisma/client'
import { globalErrors } from 'global/errors'
import { getTimeDate } from 'global/utils/getTimeDate'
import { returnBookObject } from '../book/return.book.object'
import { ReturnGenreObject } from '../genre/return.genre.object'
import { slugSelect } from '../utils/common/return.default.object'
import { serverError } from '../utils/helpers/server-error'
import { PrismaService } from '../utils/services/prisma.service'
import { returnUserObject } from './return.user.object'

function isThisWeek(date: Date) {
	const today = new Date()
	const firstDayOfWeek = new Date(
		today.setDate(today.getDate() - today.getDay())
	)
	const lastDayOfWeek = new Date(
		today.setDate(today.getDate() - today.getDay() + 6)
	)
	return date >= firstDayOfWeek && date <= lastDayOfWeek
}
const pepTalks = [
	{
		lessThan: 3,
		text: "You read less than my cat. And I don't have a cat."
	},
	{
		lessThan: 5,
		text: 'The numbers speak for themselves. Try to read more.'
	},
	{
		lessThan: 10,
		text: 'You are on the right track, but you need to read more.'
	},
	{
		lessThan: 15,
		text: 'If there was a reward for reading, you would get it.'
	},
	{
		lessThan: 50,
		text: 'You have exceeded all expectations. Keep it up.'
	},
	{
		lessThan: 100,
		text: 'Well, at first I doubted that you would last that long.'
	},
	{
		lessThan: 200,
		text: 'You read more than many people read in a year.'
	},
	{
		lessThan: 400,
		text: 'I never cease to be amazed by your abilities.'
	},
	{
		lessThan: 800,
		text: 'Even I got a bald spot from your streak'
	},
	{
		lessThan: 1000,
		text: 'You read more than I can imagine.'
	}
]

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
				endDate: history.endDate,
				progressDelta: history.progressDelta,
				startProgress: history.startProgress,
				endProgress: history.endProgress,
				scrollPosition: history.scrollPosition,
				startDate: history.startDate,
				userId: userId,
				bookSlug: history.bookSlug
			}))
		})
	}

	async adjustGoal(userId: number, goal: number) {
		if (goal % 10 !== 0 || goal < 10 || goal > 60)
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
				id: userId
			},
			select: {
				endDate: true,
				progressDelta: true,
				readingTimeMs: true,
				bookSlug: true,
				startDate: true
			}
		})
		// TODO: пофиксить не валидная запись даты
		const WeekDays = [
			'Sunday',
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday'
		]
		const currentDate = getTimeDate()

		const currentWeekHistory = userHistory.filter(history => {
			const historyDate = getTimeDate(history.endDate)
			return isThisWeek(historyDate)
		})

		const currentWeekSteakProgress = WeekDays.map(day => {
			const dayHistory = currentWeekHistory.filter(history => {
				const historyDate = getTimeDate(history.endDate)
				return historyDate.getDay() === WeekDays.indexOf(day)
			})
			const dayProgress = dayHistory.reduce(
				(accumulator, history) =>
					accumulator + history.readingTimeMs / 60_000 / user.goalMinutes,
				0
			)
			return {
				day,
				isReadMoreThatGoal: dayProgress >= user.goalMinutes,
				readingTimeMs: dayProgress
			}
		})

		const userSteak = userHistory.reduce((streak, history, index) => {
			const historyDate = getTimeDate(history.endDate)
			return historyDate.getDate() === currentDate.getDate() - index &&
				historyDate.getMonth() === currentDate.getMonth() &&
				historyDate.getFullYear() === currentDate.getFullYear() &&
				history.readingTimeMs / 60_000 >= user.goalMinutes
				? streak + 1
				: streak
		}, 0)

		console.log(
			userHistory.reduce(
				(accumulator, history) => accumulator + history.readingTimeMs,
				0
			) /
				60_000 /
				user.goalMinutes,
			'daySteakProgressPercentage'
		)
		return {
			progressByCurrentWeek: currentWeekSteakProgress,
			userSteak,
			isDaySteakComplete: Boolean(
				currentWeekSteakProgress.find(
					day => day.day === WeekDays[currentDate.getDay()]
				)?.isReadMoreThatGoal
			),
			goalMinutes: user.goalMinutes,
			daySteakProgressPercentage:
				userHistory.reduce(
					(accumulator, history) => accumulator + history.readingTimeMs,
					0
				) /
				60_000 /
				user.goalMinutes,
			pepTalk:
				pepTalks.find(pepTalk => userSteak < pepTalk.lessThan)?.text ??
				'Good result, keep it up!'
		}
	}
	async library(userId: number) {
		const library = await this.prisma.user.findUnique({
			where: { id: userId },
			select: {
				readingBooks: {
					select: {
						...returnBookObject,
						readingHistory: {
							select: {
								progressDelta: true,
								scrollPosition: true,
								endDate: true
							},
							orderBy: {
								endDate: 'desc'
							},
							take: 1
						}
					},
					where: {
						isPublic: true
					}
				},
				finishedBooks: {
					select: returnBookObject,
					where: {
						isPublic: true
					}
				},
				savedBooks: {
					select: returnBookObject,
					where: {
						isPublic: true
					}
				}
			}
		})
		if (!library)
			throw serverError(HttpStatus.BAD_REQUEST, globalErrors.somethingWrong)
		const { readingBooks, finishedBooks, savedBooks } = library

		return {
			readingBooks: readingBooks
				.map(book => ({
					...book,
					readingHistory:
						{
							scrollPosition: book.readingHistory[0]?.scrollPosition ?? 0,
							endDate: book.readingHistory[0]?.endDate,
							progress: book.readingHistory[0]?.progressDelta ?? 0
						} ?? null
				}))
				.sort((a, b) => {
					if (!a.readingHistory) return 1
					if (!b.readingHistory) return -1
					return (
						getTimeDate(b.readingHistory.endDate).getTime() -
						getTimeDate(a.readingHistory.endDate).getTime()
					)
				}),
			finishedBooks,
			savedBooks
		}
	}

	async catalog(searchTerm: string, page: number) {
		const perPage = 20
		const data = await this.prisma.user.findMany({
			take: perPage,
			select: {
				...returnUserObject,
				picture: true,
				socialId: true,
				role: true,
				createdAt: true,
				fullName: true,
				location: true,
				selectedGenres: {
					select: ReturnGenreObject
				},
				readingHistory: {
					orderBy: {
						endDate: 'asc'
					},
					select: {
						endDate: true,
						progressDelta: true,
						readingTimeMs: true,
						scrollPosition: true,
						startDate: true
					}
				},
				_count: {
					select: {
						savedBooks: true,
						review: true,
						finishedBooks: true,
						readingBooks: true
					}
				}
			},

			...(page && {
				skip: page * perPage
			}),
			...(searchTerm && {
				where: {
					fullName: {
						contains: searchTerm
					}
				},
				...(!Number.isNaN(+searchTerm) && {
					where: {
						id: +searchTerm
					}
				})
			})
		})
		const userCount = await this.prisma.user.count()
		return {
			data: data.map(({ readingHistory, ...user }) => ({
				...user,
				statistics: readingHistory.reduce<
					{
						startDate: Date
						endDate: Date
						readingTimeMs: number
						progressDelta: number
					}[]
				>((accumulator, current) => {
					const exist = accumulator.find(
						({ endDate }) => endDate === current.endDate
					)
					if (exist) {
						exist.readingTimeMs += current.readingTimeMs
						exist.progressDelta = Math.max(
							exist.progressDelta,
							current.progressDelta
						)
					} else {
						accumulator.push(current)
					}
					return accumulator
				}, [])
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
			data: {
				readingBooks: {
					connect: {
						slug
					}
				},
				savedBooks: {
					disconnect: {
						slug
					}
				},
				finishedBooks: {
					disconnect: {
						slug
					}
				}
			}
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
			data: {
				readingBooks: {
					disconnect: {
						slug
					}
				},
				savedBooks: {
					disconnect: {
						slug
					}
				},
				finishedBooks: {
					connect: {
						slug
					}
				}
			}
		})
	}

	async isSaved(userId: number, slug: string) {
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
			data: {
				savedBooks: {
					[isSavedExist ? 'disconnect' : 'connect']: {
						slug
					}
				},
				...(!isSavedExist && {
					readingBooks: {
						disconnect: {
							slug
						}
					},
					finishedBooks: {
						disconnect: {
							slug
						}
					}
				})
			}
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
}
