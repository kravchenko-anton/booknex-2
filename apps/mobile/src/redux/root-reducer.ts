import { authReducer } from '@/redux/auth/auth-slice'
import { ReadingSettingsReducer } from '@/redux/reader/reading-settings-slice'
import { combineReducers } from '@reduxjs/toolkit'

export const reducers = combineReducers({
	auth: authReducer,
	readingSettings: ReadingSettingsReducer
})
