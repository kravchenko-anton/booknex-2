import { createSlice } from '@reduxjs/toolkit'
import { login, logout } from './auth-action'
import type { IAuthState } from './auth-types'

const initialState = {
	isLoading: false,
	user: null as IAuthState | null
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(login.pending, state => {
				state.isLoading = true
			})
			.addCase(login.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.user = payload.user
			})
			.addCase(login.rejected, state => {
				state.isLoading = false
				state.user = null
			})
			.addCase(logout.fulfilled, state => {
				state.isLoading = false
				state.user = null
			})
	}
})
export const { reducer: authReducer, actions: authAction } = authSlice
