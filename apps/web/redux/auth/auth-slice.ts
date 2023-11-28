import { createSlice } from '@reduxjs/toolkit'
import { login, logout } from './auth-action'
import type { IAuthState } from './auth-types'

const initialState = {
	isLoading: false,
	user: undefined as IAuthState | undefined
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
				state.user = undefined
			})
			.addCase(logout.fulfilled, state => {
				state.isLoading = false
				state.user = undefined
			})
	}
})
export const { reducer: authReducer, actions: authAction } = authSlice
