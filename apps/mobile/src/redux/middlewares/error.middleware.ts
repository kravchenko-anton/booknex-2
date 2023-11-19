import { errorToast } from '@/utils/error-toast'
import { isRejectedWithValue } from '@reduxjs/toolkit'
import type { Middleware, MiddlewareAPI } from 'redux'

export const rtkQueryErrorLogger: Middleware =
	(api: MiddlewareAPI) => next => action => {
		if (isRejectedWithValue(action)) {
			errorToast(action.payload)
		}

		return next(action)
	}
