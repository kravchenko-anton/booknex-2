import { combineReducers } from '@reduxjs/toolkit'
import { authReducer } from './auth/auth-slice'
import { parserReducer } from './parser/parser-slice'
import { popupReducer } from './popup/popup-slice'

export const reducers = combineReducers({
	auth: authReducer,
	popup: popupReducer,
	parser: parserReducer
})
