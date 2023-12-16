import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	progress: 0 as number,
	isLoading: true as boolean,
	isRendering: true as boolean,

	goToProgress: null as number | null
}

const EpubReaderSlice = createSlice({
	name: 'reader',
	initialState,
	reducers: {
		goToProgress: (state, { payload }: PayloadAction<number>) => {
			state.goToProgress = payload
		},
		clearGoToProgress: state => {
			state.goToProgress = null
		},
		setProgress: (state, { payload }: PayloadAction<number>) => {
			console.log('setProgress', payload)
			state.progress = payload
		},

		setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
			console.log('setIsLoading', payload)
			state.isLoading = payload
		},

		setIsRendering: (state, { payload }: PayloadAction<boolean>) => {
			console.log('setIsRendering', payload)
			state.isRendering = payload
		}
	}
})
export const { reducer: EpubReaderReducer, actions: EpubReaderAction } =
	EpubReaderSlice
