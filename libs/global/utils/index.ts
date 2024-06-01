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

export const hexToRgbA = (hex: string, opacity: number) => {
	let c
	if (/^#([\dA-Fa-f]{3}){1,2}$/.test(hex)) {
		c = hex.slice(1).split('')
		if (c.length === 3) {
			c = [c[0], c[0], c[1], c[1], c[2], c[2]]
		}
		c = `0x${c.join('')}`
		// @ts-ignore
		return `rgba(${[(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',')},${opacity})`
	}
	throw new Error('Bad Hex')
}
