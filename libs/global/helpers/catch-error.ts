import { isArray } from 'class-validator'
import { globalErrors } from '../errors'

export const errorCatch = (error: any): string => {
	if (typeof error === 'string') return error
	if (typeof error?.response?.data?.message === 'string')
		return error.response.data.message
	//check validation errors from class validator
	if (isArray(error?.response?.data?.message))
		return error.response.data.message.map((m: string) => m).join(', ')
	if (typeof error.message === 'string') return error.message
	return globalErrors.somethingWrong
}
