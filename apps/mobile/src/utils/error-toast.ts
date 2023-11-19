import { errorCatch } from '@/utils/catch-error'
import Toast from 'react-native-toast-message'

export const errorToast = (error: unknown) => {
	Toast.show({
		type: 'error',
		text1: errorCatch(error),
		position: 'top',
		autoHide: true
	})
}
