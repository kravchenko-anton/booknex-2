import { getTimeDate } from '../utils'

export function formatYYYYMMDD(date = getTimeDate()) {
	const year = date.toLocaleString('default', { year: 'numeric' })
	const month = date.toLocaleString('default', {
		month: '2-digit'
	})
	const day = date.toLocaleString('default', { day: '2-digit' })

	return [year, month, day].join('-')
}

export function timeAgo(date: Date) {
	const formatter = new Intl.RelativeTimeFormat('en')
	const ranges: { [key: string]: number } = {
		years: 3600 * 24 * 365,
		months: 3600 * 24 * 30,
		weeks: 3600 * 24 * 7,
		days: 3600 * 24,
		hours: 3600,
		minutes: 60,
		seconds: 1
	}
	const secondsElapsed = (date.getTime() - Date.now()) / 1000
	for (const key in ranges) {
		const rangeKey = ranges[key]
		if (!rangeKey) continue
		if (!(rangeKey < Math.abs(secondsElapsed))) continue
		const delta = secondsElapsed / rangeKey
		return formatter.format(
			Math.round(delta),
			key as
				| 'year'
				| 'years'
				| 'quarter'
				| 'quarters'
				| 'month'
				| 'months'
				| 'week'
				| 'weeks'
				| 'day'
				| 'days'
				| 'hour'
				| 'hours'
				| 'minute'
				| 'minutes'
				| 'second'
				| 'seconds'
		)
	}
	return 'Just now'
}
