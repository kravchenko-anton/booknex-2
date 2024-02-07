import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { EMULATOR_SERVER_URL, getAuthUrl, SERVER_URL } from 'global/api-config'
import { errorToast, successToast } from '../../../../web/utils/toast'
import { deleteTokensStorage, saveTokensStorage } from './auth-helper'
import type {
	AuthFieldsType,
	AuthResponseType,
	googleAuthResponseType,
	RegisterFieldsType
} from './auth-types'

export const googleLogin = createAsyncThunk<
	AuthResponseType,
	{
		socialId: string
	}
>('auth/googleLogin', async ({ socialId }, thunkAPI) => {
	try {
		const loginResponse = await axios
			.post<googleAuthResponseType>(SERVER_URL + getAuthUrl('/google-sign'), {
				socialId
			})
			.then(response => response.data)
		await saveTokensStorage({
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

export const mailRegister = createAsyncThunk<
	AuthResponseType,
	RegisterFieldsType
>('auth/mailRegister', async (properties, thunkAPI) => {
	try {
		const registerResponse = await axios
			.post<AuthResponseType>(
				EMULATOR_SERVER_URL + getAuthUrl('/mail-register'),
				{
					...properties
				}
			)
			.then(response => response.data)
		await saveTokensStorage({
			accessToken: registerResponse.accessToken,
			refreshToken: registerResponse.refreshToken
		})
		return registerResponse
	} catch (error) {
		return thunkAPI.rejectWithValue(error)
	}
})

export const mailLogin = createAsyncThunk<AuthResponseType, AuthFieldsType>(
	'auth/mailLogin',
	async ({ email, password }, thunkAPI) => {
		try {
			const loginResponse = await axios
				.post<AuthResponseType>(
					EMULATOR_SERVER_URL + getAuthUrl('/mail-login'),
					{
						email,
						password
					}
				)
				.then(response => response.data)
			await saveTokensStorage({
				accessToken: loginResponse.accessToken,
				refreshToken: loginResponse.refreshToken
			})
			return loginResponse
		} catch (error) {
			return thunkAPI.rejectWithValue(error)
		}
	}
)

export const logout = createAsyncThunk('auth/logout', async () => {
	try {
		await deleteTokensStorage()
	} catch {
		/* empty */
	}
	return {}
})
