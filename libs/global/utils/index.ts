import { getFileUrl } from '../api-config'

export const appName = 'Booknex'
export const mailLink = 'mailto:booknex.company@gmail.com'
export const socialLinks = {
	telegram: 'https://t.me/AntonKravcenco',
	github: 'https://github.com/kravchenko-anton'
}
export const getTimeDate = (initialDate?: Date | string) => {
	if (initialDate) return new Date(initialDate)
	return new Date()
}

export const installAppLink = getFileUrl('booknex.apk')

export function timeAgo(date: Date) {
	// @ts-ignore
	const seconds = Math.floor((new Date() - new Date(date)) / 1000)

	let interval = seconds / 31_536_000

	if (interval > 1) {
		return Math.floor(interval) + ' years'
	}
	interval = seconds / 2_592_000
	if (interval > 1) {
		return Math.floor(interval) + ' months'
	}
	interval = seconds / 86_400
	if (interval > 1) {
		return Math.floor(interval) + ' days'
	}
	interval = seconds / 3600
	if (interval > 1) {
		return Math.floor(interval) + ' hours'
	}
	interval = seconds / 60
	if (interval > 1) {
		return Math.floor(interval) + ' minutes'
	}
	return Math.floor(seconds) + ' seconds'
}
