import api from '@/api'
import { errorToast, successToast } from '@/utils/toast'
import { createAsyncThunk } from '@reduxjs/toolkit'
import type { AuthDto, AuthOutput } from 'global/api-client'
import { deleteTokensStorage, saveTokensStorage } from './auth-helper'

export const googleLogin = createAsyncThunk<
	AuthOutput,
	{
		socialId: string
	}
>('auth/googleLogin', async ({ socialId }, thunkAPI) => {
	try {
		console.log('socialId', socialId)
		const { data: loginResponse } = await api.auth.googleSign({ socialId })

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

export const mailRegister = createAsyncThunk<AuthOutput, AuthDto>(
	'auth/mailRegister',
	async (properties, thunkAPI) => {
		const { data: registerResponse } = await api.auth.register(properties)
		if (!registerResponse.accessToken)
			return thunkAPI.rejectWithValue('No response')
		await saveTokensStorage({
			accessToken: registerResponse.accessToken,
			refreshToken: registerResponse.refreshToken
		})
		return registerResponse
	}
)

export const mailLogin = createAsyncThunk<AuthOutput, AuthDto>(
	'auth/mailLogin',
	async ({ email, password }, thunkAPI) => {
		const { data: loginResponse } = await api.auth.login({
			email,
			password
		})
		if (!loginResponse.accessToken)
			return thunkAPI.rejectWithValue('No response')
		await saveTokensStorage({
			accessToken: loginResponse.accessToken,
			refreshToken: loginResponse.refreshToken
		})
		return loginResponse
	}
)

export const logout = createAsyncThunk('auth/logout', async () => {
	await deleteTokensStorage()
	return {}
})
