import { Share } from 'react-native'

export const share = (message: string) => {
	return Share.share({
		message
	})
}
