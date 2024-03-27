import { authReducer } from '@/redux/auth/auth-slice'
import { ReadingProgressReducer } from '@/redux/reader/readering-progress-slice'
import { ReadingUiReducer } from '@/redux/reader/reading-settings-slice'
import { combineReducers } from '@reduxjs/toolkit'

export const reducers = combineReducers({
	auth: authReducer,
	readingUi: ReadingUiReducer,
	readingProgress: ReadingProgressReducer
})
