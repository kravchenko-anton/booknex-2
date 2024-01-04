import { errorCatch } from 'global/utils/catch-error'
import Toast from 'react-native-toast-message'

export const errorToast = (error: unknown) => {
	Toast.show({
		type: 'error',
		text1: errorCatch(error),
		position: 'bottom',
		bottomOffset: 80
	})
}

export const successToast = (message: string) => {
	Toast.show({
		type: 'success',
		text1: message,
		position: 'bottom',
		bottomOffset: 80
	})
}
