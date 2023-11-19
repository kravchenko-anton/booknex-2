import type { AlertProperties } from '@/components/ui/alert/alert-types'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	alert: null as null | AlertProperties
}

const alertSlice = createSlice({
	name: 'alert',
	initialState,
	reducers: {
		showAlert: (state, { payload }: PayloadAction<AlertProperties>) => {
			state.alert = payload
		},
		closeAlert: state => {
			state.alert = null
		}
	}
})

export const { reducer: alertReducer, actions: alertAction } = alertSlice
