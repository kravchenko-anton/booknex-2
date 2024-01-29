import { authReducer } from '@/features/auth/action/auth-slice'
import { combineReducers } from '@reduxjs/toolkit'

export const reducers = combineReducers({
	auth: authReducer
})
