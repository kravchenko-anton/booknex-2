import { GlobalErrorsEnum } from '../../../apps/backend/src/utils/errors'

export const errorCatch = (error: any): string => {
	if (typeof error === 'string') return error
	if (typeof error.message === 'string') return error.message
	if (typeof error?.response?.data?.message === 'string')
		return error?.response?.data?.message
	return GlobalErrorsEnum.somethingWrong
}
