import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	lastParsedData: null as null | {
		url: string
		page: number
	}
}

const parserSlice = createSlice({
	name: 'parser',
	initialState,
	reducers: {
		updateLastParsedData: (
			state,
			{
				payload
			}: PayloadAction<{
				url: string
				page: number
			}>
		) => {
			state.lastParsedData = payload
		}
	}
})

export const { reducer: parserReducer, actions: parserAction } = parserSlice
