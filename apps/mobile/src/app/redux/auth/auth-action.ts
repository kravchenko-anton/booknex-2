import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { EMULATOR_SERVER_URL, getAuthUrl } from 'global/api-config'
import { deleteTokensStorage, saveTokensStorage } from './auth-helper'
import type {
	AuthFieldsType,
	AuthResponseType,
	RegisterFieldsType
} from './auth-types'

export const register = createAsyncThunk<AuthResponseType, RegisterFieldsType>(
	'auth/register',
	async (properties, thunkAPI) => {
		try {
			const registerResponse = await axios
				.post<AuthResponseType>(EMULATOR_SERVER_URL + getAuthUrl('/register'), {
					...properties
				})
				.then(response => response.data)
			await saveTokensStorage({
				accessToken: registerResponse.accessToken,
				refreshToken: registerResponse.refreshToken
			})
			return registerResponse
		} catch (error) {
			return thunkAPI.rejectWithValue(error)
		}
	}
)

export const login = createAsyncThunk<AuthResponseType, AuthFieldsType>(
	'auth/login',
	async ({ email, password }, thunkAPI) => {
		try {
			const loginResponse = await axios
				.post<AuthResponseType>(EMULATOR_SERVER_URL + getAuthUrl('/login'), {
					email,
					password
				})
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

export const getNewToken = createAsyncThunk<AuthResponseType, string>(
	'auth/getToken',
	async (refreshToken, thunkAPI) => {
		try {
			const tokensResponse = await axios
				.post<AuthResponseType>(
					EMULATOR_SERVER_URL + getAuthUrl('/access-token'),
					{
						refreshToken
					}
				)
				.then(response => response.data)
			await saveTokensStorage({
				accessToken: tokensResponse.accessToken,
				refreshToken: tokensResponse.refreshToken
			})
			return tokensResponse
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
