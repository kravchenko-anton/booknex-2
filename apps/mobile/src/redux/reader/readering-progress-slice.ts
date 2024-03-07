import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	books: [] as NonNullable<
		{
			id: number
			latestProgress: {
				location: number
				progress: number
			}
		}[]
	>
}
const ReadingProgressSlice = createSlice({
	name: 'reading-progress',
	initialState,
	reducers: {
		updateReadingProgress: (
			state,
			{
				payload
			}: PayloadAction<{ id: number; progress: number; location: number }>
		) => {
			console.log('updateReadingProgress', payload)
			const book = state.books.find(value => value.id === payload.id)
			if (book)
				book.latestProgress = {
					progress: payload.progress,
					location: payload.location
				}
			state.books = [
				...state.books,
				{
					id: payload.id,
					latestProgress: {
						progress: payload.progress,
						location: payload.location
					}
				}
			]
		}
	}
})
export const {
	reducer: ReadingProgressReducer,
	actions: ReadingProgressAction
} = ReadingProgressSlice
