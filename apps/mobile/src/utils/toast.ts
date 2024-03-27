import { errorCatch } from 'global/helpers/catch-error'
import Toast from 'react-native-toast-message'

export const errorToast = (error: unknown) => {
	Toast.show({
		type: 'error',
		text1: errorCatch(error),
		position: 'top',
		topOffset: 40,
		swipeable: true
	})
}

export const successToast = (message: string) => {
	Toast.show({
		type: 'success',
		text1: message,
		position: 'top',
		topOffset: 40,
		swipeable: true
	})
}
