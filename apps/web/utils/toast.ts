import { errorCatch } from 'global/utils/catch-error'
import toast from 'react-hot-toast'

export const errorToast = (error: unknown) => {
	toast.error(errorCatch(error))
}

export const successToast = (message: string) => {
	toast.success(message)
}
