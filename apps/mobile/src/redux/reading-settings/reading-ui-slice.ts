import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	visible: false as boolean
}

const ReadingUiSlice = createSlice({
	name: 'reading-ui',
	initialState,
	reducers: {
		toggleReadingUi: state => {
			state.visible = !state.visible
		},
		hideReadingUi: state => {
			state.visible = false
		}
	}
})

export const { reducer: readingUiReducer, actions: readingUiAction } =
	ReadingUiSlice
