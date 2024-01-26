import { combineReducers } from '@reduxjs/toolkit'
import { authReducer } from '../../features/auth/action/auth-slice'
import { parserReducer } from './parser/parser-slice'

export const reducers = combineReducers({
	auth: authReducer,
	parser: parserReducer
})
