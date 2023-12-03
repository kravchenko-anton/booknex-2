import toast from 'react-hot-toast'
import { errorCatch } from '../../../libs/global/utils/catch-error'

export const errorToast = (error: unknown) => {
	toast.error(errorCatch(error))
}

export const successToast = (message: string) => {
	toast.success(message)
}
