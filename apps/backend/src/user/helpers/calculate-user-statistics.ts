import { isThisWeek, pepTalks } from '@/src/user/user.utils'
import type { UserStatistics } from 'global/api-client'
import { fromMinutesToMs } from 'global/utils/numberConvertor'

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
export interface CalculateUserStatisticsType {
	userHistory: {
		startDate: Date
		endDate: Date
		readingTimeMs: number
		progressDelta: number
		id: string
	}[]
	goalMinutes: number
}

export const calculateUserStatistics = ({
	userHistory,
	goalMinutes
}: CalculateUserStatisticsType): Omit<UserStatistics, 'goalMinutes'> => {
	const progressByCurrentWeek = daysOfWeek.map(day => {
		const data = userHistory.reduce(
			(accumulator, history) =>
				new Date(history.startDate).getDay() === daysOfWeek.indexOf(day) + 1 &&
				isThisWeek(history.startDate)
					? {
							readingTimeMs: accumulator.readingTimeMs + history.readingTimeMs,
							dayProgress:
								((accumulator.readingTimeMs + history.readingTimeMs) /
									fromMinutesToMs(goalMinutes)) *
								100
						}
					: accumulator,
			{ readingTimeMs: 0, dayProgress: 0 }
		)
		return {
			day: day,
			isCurrentDay: new Date().getDay() === daysOfWeek.indexOf(day) + 1,
			readingTimeMs: data.readingTimeMs,
			dayProgress: Math.min(data.dayProgress, 100)
		}
	})

	const historyGroupedByDay = userHistory.reduce(
		(accumulator, history) => {
			const date = new Date(history.startDate).toDateString()
			const day = accumulator[date] ?? {
				readingTimeMs: 0
			}
			return {
				...accumulator,
				[date]: {
					readingTimeMs: day.readingTimeMs + history.readingTimeMs
				}
			}
		},
		{} as Record<string, { readingTimeMs: number }>
	)

	const userSteak = Object.values(historyGroupedByDay).reduce(
		// reading time more than 10 minutes
		(accumulator, day) =>
			day.readingTimeMs > fromMinutesToMs(goalMinutes) ? accumulator + 1 : 0,
		0
	)
	console.log('progressByCurrentWeek', progressByCurrentWeek)
	return {
		userSteak,
		pepTalk:
			pepTalks.find(pepTalk => userSteak < pepTalk.lessThan)?.text ??
			'Good result, keep it up!',

		progressByCurrentWeek
	}
}
