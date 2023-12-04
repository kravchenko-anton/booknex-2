import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	popup: null as null | JSX.Element
}

const popupSlice = createSlice({
	name: 'popup',
	initialState,
	reducers: {
		showPopup: (state, { payload }: PayloadAction<JSX.Element>) => {
			state.popup = payload
		},
		closePopup: state => {
			state.popup = null
		}
	}
})

export const { reducer: popupReducer, actions: popupAction } = popupSlice
