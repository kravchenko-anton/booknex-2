import { authReducer } from '@/features/auth/action/auth-slice'
import { ReadingSettingsReducer } from '@/features/reader/action/reading-settings-slice'
import { combineReducers } from '@reduxjs/toolkit'

export const reducers = combineReducers({
	auth: authReducer,
	readingSettings: ReadingSettingsReducer
})
