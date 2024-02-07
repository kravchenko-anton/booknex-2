import { errorToast, successToast } from '@/utils/toast'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { ErrorsEnum } from 'backend/src/utils/errors'
import { SERVER_URL, getAuthUrl } from 'global/api-config'
import type { AuthFieldsType } from '../../../mobile/src/features/auth/action/auth-types'
import { deleteTokensStorage, saveTokensStorage } from './auth-helper'
import type { AuthResponseType } from './auth-types'

export const mailLogin = createAsyncThunk<AuthResponseType, AuthFieldsType>(
	'auth/mailLogin',
	async ({ email, password }, thunkAPI) => {
		try {
			const loginResponse = await axios
				.post<AuthResponseType>(SERVER_URL + getAuthUrl('/login'), {
					email,
					password
				})
				.then(response => response.data)
			if (loginResponse.user.role !== 'ADMIN')
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

export const googleLogin = createAsyncThunk<
	AuthResponseType,
	{
		socialId: string
	}
>('auth/googleLogin', async ({ socialId }, thunkAPI) => {
	try {
		const loginResponse = await axios
			.post<AuthResponseType>(SERVER_URL + getAuthUrl('/'), {
				socialId
			})
			.then(response => response.data)
		if (loginResponse.user.role !== 'ADMIN')
			return thunkAPI.rejectWithValue(ErrorsEnum.Something_Went_Wrong)
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
})

export const getNewToken = createAsyncThunk<AuthResponseType, string>(
	'auth/getToken',
	async (refreshToken, thunkAPI) => {
		try {
			const tokensResponse = await axios
				.post<AuthResponseType>(SERVER_URL + getAuthUrl('/refresh'), {
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
