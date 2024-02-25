import { errorToast, successToast } from '@/utils/toast'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import type { AuthDto, AuthResponseDto } from 'global/api-client'
import { emulatorServerURL } from 'global/api-config'
import { deleteTokensStorage, saveTokensStorage } from './auth-helper'

export const googleLogin = createAsyncThunk<
	AuthResponseDto,
	{
		socialId: string
	}
>('auth/googleLogin', async ({ socialId }, thunkAPI) => {
	try {
		console.log('socialId', socialId)
		const { data: loginResponse } = await axios.post<AuthResponseDto>(
			emulatorServerURL + '/api/auth/google-sign',
			{
				socialId
			}
		)

		console.log('loginResponse', loginResponse)
		if (!loginResponse.accessToken)
			return thunkAPI.rejectWithValue('No response')
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

export const mailRegister = createAsyncThunk<AuthResponseDto, AuthDto>(
	'auth/mailRegister',
	async (properties, thunkAPI) => {
		const { data: registerResponse } = await axios.post<AuthResponseDto>(
			emulatorServerURL + '/api/auth/mail-register',
			{
				...properties
			}
		)
		if (!registerResponse.accessToken)
			return thunkAPI.rejectWithValue('No response')
		await saveTokensStorage({
			accessToken: registerResponse.accessToken,
			refreshToken: registerResponse.refreshToken
		})
		return registerResponse
	}
)

export const mailLogin = createAsyncThunk<AuthResponseDto, AuthDto>(
	'auth/mailLogin',
	async ({ email, password }, thunkAPI) => {
		const { data: loginResponse } = await axios.post<AuthResponseDto>(
			emulatorServerURL + '/api/auth/mail-login',
			{
				email,
				password
			}
		)
		if (!loginResponse.accessToken)
			return thunkAPI.rejectWithValue('No response')
		await saveTokensStorage({
			accessToken: loginResponse.accessToken,
			refreshToken: loginResponse.refreshToken
		})
		return loginResponse
	}
)

export const logout = createAsyncThunk('/api/auth/logout', async () => {
	await deleteTokensStorage()
	return {}
})
