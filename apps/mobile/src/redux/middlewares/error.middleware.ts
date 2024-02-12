import { errorToast } from '@/utils/toast'
import { isRejectedWithValue } from '@reduxjs/toolkit'
import type { Middleware } from 'redux'

export const rtkQueryErrorLogger: Middleware = () => next => action => {
	if (isRejectedWithValue(action)) {
		errorToast(action.payload)
	}

	return next(action)
}