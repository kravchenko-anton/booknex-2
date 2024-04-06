import { errorCatch } from 'global/helpers/catch-error'
import type { ExternalToast } from 'sonner'
import { toast } from 'sonner'

export const errorToast = (error: unknown, data?: ExternalToast) => {
	toast.error('An error occurred, please try again later', {
		...data,
		description: errorCatch(error)
	})
}

export const successToast = (message: string, data?: ExternalToast) => {
	toast.success(message, data)
}

export const infoToast = (message: string, data?: ExternalToast) => {
	toast.info(message, data)
}

export const acceptToast = (
	message: string,
	data?: ExternalToast | undefined
) => {
	toast(message, {
		...data
	})
}
