import { days, pepTalks } from '@/src/user/user.utils'
import type { UserStatistics } from 'global/api-client'
import { getTimeDate } from 'global/utils'
import { fromMinutesToMs } from 'global/utils/numberConvertor'

export interface CalculateUserStatisticsType {
	userHistory: {
		startDate: Date
		endDate: Date
		readingTimeMs: number
		progressDelta: number
		bookSlug: string
	}[]
	goalMinutes: number
}
// TODO: пофиксить тут

export const calculateUserStatistics = ({
	userHistory,
	goalMinutes
}: CalculateUserStatisticsType): Omit<UserStatistics, 'goalMinutes'> => {
	const currentDate = new Date()

	// calculate how long user reading day by day with no loose
	const sortedHistory = userHistory.sort(
		(a, b) => a.endDate.getTime() - b.endDate.getTime()
	)

	let streak = 0
	let maxStreak = 0
	for (let index = 1; index < sortedHistory.length; index++) {
		const previousDate = new Date(sortedHistory[index - 1]?.endDate ?? '')
		const currentDate = new Date(sortedHistory[index]?.endDate ?? '')

		// Check if the current date is the day after the previous date
		previousDate.setDate(previousDate.getDate() + 1)
		if (
			previousDate.getDate() === currentDate.getDate() &&
			previousDate.getMonth() === currentDate.getMonth() &&
			previousDate.getFullYear() === currentDate.getFullYear()
		) {
			streak++
		} else {
			maxStreak = Math.max(maxStreak, streak)
			streak = 0
		}
	}
	maxStreak = Math.max(maxStreak, streak)

	const progressByCurrentWeek = Array.from({ length: 7 }, (_, index) => index)
		.map((_, index) => {
			// get day
			const day = new Date(currentDate)
			day.setDate(currentDate.getDate() - index)
			const dayReadingTimeMs = sortedHistory
				.filter(
					history => getTimeDate(history.endDate).getDate() === day.getDate()
				)
				.reduce(
					(accumulator, history) => accumulator + history.readingTimeMs,
					0
				)

			console.log(
				// get day reading time to minutes
				dayReadingTimeMs,
				'dayReadingTimeMs ' + day.toLocaleDateString('en-US')
			)
			console.log(goalMinutes)
			const dayProgress = dayReadingTimeMs / fromMinutesToMs(goalMinutes)
			return {
				day: day.toLocaleDateString('en-US', {
					weekday: 'long'
				}),
				isCurrentDay: getTimeDate(day).getDate() === currentDate.getDate(),
				readingTimeMs: dayReadingTimeMs,
				dayProgress: dayProgress
			}
		})
		.sort((a, b) => days.indexOf(a.day) - days.indexOf(b.day))

	return {
		userSteak: maxStreak,
		pepTalk:
			pepTalks.find(pepTalk => maxStreak < pepTalk.lessThan)?.text ??
			'Good result, keep it up!',
		progressByCurrentWeek
	}
}
