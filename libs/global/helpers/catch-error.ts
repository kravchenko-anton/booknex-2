import { GlobalErrorsEnum } from '../errors'

export const errorCatch = (error: any): string => {
	if (typeof error === 'string') return error
	if (typeof error?.response?.data?.message === 'string')
		return error?.response?.data?.message
	if (typeof error.message === 'string') return error.message
	return GlobalErrorsEnum.somethingWrong
}
