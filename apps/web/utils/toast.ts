import { errorCatch } from 'global/helpers/catch-error'
import type { ExternalToast } from 'sonner'
import { toast } from 'sonner'

export const errorToast = (error: unknown, data?: ExternalToast) => {
	toast.error(errorCatch(error), data)
}

export const successToast = (message: string, data?: ExternalToast) => {
	toast.success(message, data)
}

export const loadingToast = (message: string, data?: ExternalToast) => {
	toast.loading(message, data)
}

export const acceptToast = (
	message: string,
	data?: ExternalToast | undefined
) => {
	toast(message, {
		...data
	})
}
