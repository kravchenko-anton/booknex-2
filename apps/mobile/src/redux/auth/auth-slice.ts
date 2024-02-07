import { createSlice } from '@reduxjs/toolkit'
import { logout, mailLogin, mailRegister } from './auth-action'
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
			.addCase(mailRegister.pending, state => {
				state.isLoading = true
			})
			.addCase(mailRegister.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.user = payload.user
			})
			.addCase(mailRegister.rejected, state => {
				state.isLoading = false
				state.user = null
			})
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
			.addCase(logout.fulfilled, state => {
				state.isLoading = false
				state.user = null
			})
	}
})
export const { reducer: authReducer } = authSlice
