import { createSlice } from '@reduxjs/toolkit'
import { googleLogin, logout, mailLogin } from './auth-action'
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
			.addCase(mailLogin.pending, state => {
				state.isLoading = true
			})
			.addCase(mailLogin.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.user = payload.user
			})
			.addCase(mailLogin.rejected, state => {
				state.isLoading = false
				state.user = null
			})
			.addCase(googleLogin.pending, state => {
				state.isLoading = true
			})
			.addCase(googleLogin.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.user = payload.user
			})
			.addCase(googleLogin.rejected, state => {
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
