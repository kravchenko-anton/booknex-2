import { createSlice } from '@reduxjs/toolkit'
import type { AuthOutput } from 'global/api-client'
import { googleLogin, logout, mailLogin, mailRegister } from './auth-action'

const initialState = {
	isLoading: false,
	authType: null as 'register' | 'login' | null,
	user: null as AuthOutput['user'] | null
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(googleLogin.pending, state => {
				state.isLoading = true
			})
			.addCase(googleLogin.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.user = payload.user
				state.authType = payload.type as 'register' | 'login'
			})
			.addCase(googleLogin.rejected, state => {
				state.isLoading = false
				state.user = null
				state.authType = null
			})
			.addCase(mailRegister.pending, state => {
				state.isLoading = true
			})
			.addCase(mailRegister.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.user = payload.user
				state.authType = 'register'
			})
			.addCase(mailRegister.rejected, state => {
				state.isLoading = false
				state.user = null
				state.authType = null
			})
			.addCase(mailLogin.pending, state => {
				state.isLoading = true
			})
			.addCase(mailLogin.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.user = payload.user
				state.authType = 'login'
			})
			.addCase(mailLogin.rejected, state => {
				state.isLoading = false
				state.user = null
				state.authType = null
			})
			.addCase(logout.fulfilled, state => {
				state.isLoading = false
				state.user = null
				state.authType = null
			})
	}
})
export const { reducer: authReducer } = authSlice
