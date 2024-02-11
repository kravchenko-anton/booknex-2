import { errorToast } from '@/utils/toast'
import { isRejectedWithValue } from '@reduxjs/toolkit'
import type { Middleware, MiddlewareAPI } from 'redux'

export const rtkQueryErrorLogger: Middleware =
	(api: MiddlewareAPI) => next => action => {
		if (isRejectedWithValue(action)) {
			console.log(api)
			console.error('RTK Query Error:', action)
			errorToast(action.payload)
		}

		return next(action)
	}
