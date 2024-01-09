import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getAuthUrl, SERVER_URL } from '../../../../libs/global/api-config'
import { errorToast, successToast } from '../../utils/toast'
import { deleteTokensStorage, saveTokensStorage } from './auth-helper'
import type { AuthFieldsType, AuthResponseType } from './auth-types'

export const login = createAsyncThunk<AuthResponseType, AuthFieldsType>(
	'auth/login',
	async ({ email, password }, thunkAPI) => {
		try {
			const loginResponse = await axios
				.post<AuthResponseType>(SERVER_URL + getAuthUrl('/login'), {
					email,
					password
				})
				.then(response => response.data)
			if (!loginResponse.user.isAdmin)
				return thunkAPI.rejectWithValue('You are not admin')
			saveTokensStorage({
				accessToken: loginResponse.accessToken,
				refreshToken: loginResponse.refreshToken
			})

			successToast('Login successfully')
			return loginResponse
		} catch (error) {
			errorToast(error)
			return thunkAPI.rejectWithValue(error)
		}
	}
)

export const getNewToken = createAsyncThunk<AuthResponseType, string>(
	'auth/getToken',
	async (refreshToken, thunkAPI) => {
		try {
			const tokensResponse = await axios
				.post<AuthResponseType>(SERVER_URL + getAuthUrl('/access-token'), {
					refreshToken
				})
				.then(response => response.data)
			saveTokensStorage({
				accessToken: tokensResponse.accessToken,
				refreshToken: tokensResponse.refreshToken
			})
			return tokensResponse
		} catch (error) {
			return thunkAPI.rejectWithValue(error)
		}
	}
)

export const logout = createAsyncThunk('auth/logout', () => {
	try {
		successToast('Logout successfully')
		deleteTokensStorage()
	} catch (error) {
		errorToast(error)
	}
	return {}
})
