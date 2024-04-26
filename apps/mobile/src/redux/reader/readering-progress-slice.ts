import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export interface ReadingHistoryType {
	slug: string
	progress: number
	scrollPosition: number
	startDate: Date
	endDate: Date
	readTimeMs: number
}
const initialState = {
	history: [] as ReadingHistoryType[],
	startFromReadingScreen: false as boolean
}
const ReadingProgressSlice = createSlice({
	name: 'readingProgress',
	initialState,
	reducers: {
		addHistory(state, action: PayloadAction<ReadingHistoryType>) {
			console.log('addHistory', action.payload)
			state.history.push(action.payload)
		},
		removeHistory(state, action: PayloadAction<string>) {
			state.history = state.history.filter(item => item.slug !== action.payload)
		},
		setStartFromReadingScreen(state, action: PayloadAction<boolean>) {
			state.startFromReadingScreen = action.payload
		}
	}
})
export const {
	reducer: ReadingProgressReducer,
	actions: ReadingProgressAction
} = ReadingProgressSlice
