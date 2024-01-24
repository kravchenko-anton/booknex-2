import { authReducer } from '@/features/auth/action/auth-slice'
import { ReadingSettingsReducer } from '@/shared/redux/reading-settings/reading-settings-slice'
import { combineReducers } from '@reduxjs/toolkit'

export const reducers = combineReducers({
	auth: authReducer,
	readingSettings: ReadingSettingsReducer
})
