import { formatYYYYMMDD } from '../helpers/time-format'

export interface ActivitiesProperties {
	importance: number
	createdAt: Date
	type: string
	genreId: number | null
	bookId: number | null
	userId: number | null
}

export interface ActivitiesOutput {
	date: string
	count: number
	level: number
	activities: {
		message: string
		time: string
		importance: number
	}[]
}

type ActivitiesByDate = Record<
	string,
	{
		date: string
		activities: ActivitiesOutput['activities']
		count: number
	}
>

const timeFormat = (date: Date) =>
	('0' + new Date(date).getHours()).slice(-2) +
	':' +
	('0' + new Date(date).getMinutes()).slice(-2)

export const transformActivity = (
	activities: ActivitiesProperties[]
): ActivitiesOutput[] => {
	const activitiesByDate = activities.reduce<ActivitiesByDate>(
		(accumulator, activity) => {
			const date = formatYYYYMMDD(activity.createdAt)
			accumulator[date] = accumulator[date] || {
				date,
				count: 0,
				activities: []
			}
			accumulator[date].activities.push({
				importance: activity.importance,
				message:
					activity.type +
					` (${activity.bookId ? `book: ${activity.bookId}; ` : ''}${activity.genreId ? `genre: ${activity.genreId}; ` : ''}${activity.userId ? `user: ${activity.userId}` : ''})`,
				time: timeFormat(activity.createdAt)
			})
			accumulator[date].count++
			return accumulator
		},
		{}
	)

	return (
		Object.values(activitiesByDate).map(({ activities, ...rest }) => ({
			level: activities.reduce(
				(accumulator, { importance }) => Math.max(accumulator, importance),
				0
			),
			activities,
			...rest
		})) || []
	)
}
