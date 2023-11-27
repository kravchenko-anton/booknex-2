import Toast from 'react-native-toast-message'
import { errorCatch } from './catch-error'

export const errorToast = (error: unknown) => {
	Toast.show({
		type: 'error',
		text1: errorCatch(error),
		position: 'top',
		autoHide: true
	})
}

