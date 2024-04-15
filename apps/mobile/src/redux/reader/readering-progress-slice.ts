import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	books: [] as NonNullable<
		{
			slug: string
			latestProgress: {
				scrollPosition: number
				progress: number
			}
		}[]
	>
}
const ReadingProgressSlice = createSlice({
	name: 'readingProgress',
	initialState,
	reducers: {
		updateReadingProgress: (
			state,
			{
				payload
			}: PayloadAction<{
				slug: string
				progress: number
				scrollPosition: number
			}>
		) => {
			console.log('updateReadingProgress', payload)
			const book = state.books.find(value => value.slug === payload.slug)
			if (book)
				book.latestProgress = {
					progress: payload.progress,
					scrollPosition: payload.scrollPosition
				}
			state.books = [
				...state.books,
				{
					slug: payload.slug,
					latestProgress: {
						progress: payload.progress,
						scrollPosition: payload.scrollPosition
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
