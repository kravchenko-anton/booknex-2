import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export interface ReadingHistoryType {
	bookSlug: string
	progress: number
	scrollPosition: number
	startDate: Date
	endDate: Date
	readingTimeMs: number
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
			console.log('state.history', state.history)
		},
		clearHistory(state) {
			state.history = []
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
