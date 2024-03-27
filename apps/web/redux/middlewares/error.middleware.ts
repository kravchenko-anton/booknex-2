import { errorToast } from '@/utils/toast'
import { isRejectedWithValue } from '@reduxjs/toolkit'
import type { Middleware, MiddlewareAPI } from 'redux'

export const rtkQueryErrorLogger: Middleware =
	(api: MiddlewareAPI) => next => action => {
		if (isRejectedWithValue(action)) {
			console.log(api)
			errorToast(action.payload)
		}

		return next(action)
	}
