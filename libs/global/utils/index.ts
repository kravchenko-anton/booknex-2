import { getFileUrl } from '../api-config'

export const appName = 'Booknex'
export const mailLink = 'mailto:booknex.company@gmail.com'
export const socialLinks = {
	telegram: 'https://t.me/AntonKravcenco',
	github: 'https://github.com/kravchenko-anton'
}
export const getTimeDate = (initialDate?: Date | string) => {
	if (initialDate) {
		return new Date(initialDate)
	}
	return new Date()
}

export const installAppLink = getFileUrl('booknex.apk')
