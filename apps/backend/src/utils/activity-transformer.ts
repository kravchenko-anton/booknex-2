import { formatYYYYMMDD } from '../../../../libs/global/utils/time-format'

export interface ActivitiesProperties {
	importance: number
	id: number
	createdAt: Date
	type: string
	genreId: number
	bookId: number
	userId: number
	collectionId: number
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
	('0' + new Date(date).getHours()).substr(-2) +
	':' +
	('0' + new Date(date).getMinutes()).substr(-2)

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
					` (${!!activity.bookId ? `book: ${activity.bookId}` : ''}${!!activity.genreId ? `genre: ${activity.genreId}` : ''}${!!activity.collectionId ? `collection: ${activity.collectionId}` : ''}${!!activity.userId ? `user: ${activity.userId}` : ''})`,
				time: timeFormat(activity.createdAt)
			})
			accumulator[date].count++
			return accumulator
		},
		{}
	)

	return Object.values(activitiesByDate).map(({ activities, count, date }) => ({
		date,
		count,
		level:
			activities.reduce((acc, { importance }) => acc + importance, 0) / count,
		activities
	}))
}
