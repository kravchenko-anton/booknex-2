import api from '@/api'
import { errorToast, successToast } from '@/utils/toast'
import { createAsyncThunk } from '@reduxjs/toolkit'
import type { AuthDto, AuthOutput } from 'global/api-client'
import { deleteTokensStorage, saveTokensStorage } from './auth-helper'
import { globalErrors } from 'global/errors'
//TODO: переределать авторизацию на zustand

export const googleLogin = createAsyncThunk<
	AuthOutput,
	{
		socialId: string
	}
>('auth/googleLogin', async ({ socialId }, thunkAPI) => {
	try {
		console.log('socialId', socialId)
		const { data: loginResponse } = await api.auth.googleSign({
			socialId
		})
		console.log('loginResponse', loginResponse)

		console.log('loginResponse', loginResponse)
		if (!loginResponse.accessToken)
			return thunkAPI.rejectWithValue(globalErrors.somethingWrong)
		await saveTokensStorage({
			accessToken: loginResponse.accessToken,
			refreshToken: loginResponse.refreshToken
		})

		successToast('Login successfully')
		return loginResponse
	} catch (error) {
		console.error(error)
		errorToast(error)
		return thunkAPI.rejectWithValue(error)
	}
})

export const mailRegister = createAsyncThunk<AuthOutput, AuthDto>(
	'auth/mailRegister',
	async (properties, thunkAPI) => {
	try {
		const { data: registerResponse } = await api.auth.mailRegister(properties)
		if (!registerResponse.accessToken)
			return thunkAPI.rejectWithValue(globalErrors.somethingWrong)
		await saveTokensStorage({
			accessToken: registerResponse.accessToken,
			refreshToken: registerResponse.refreshToken
		})
		return registerResponse
	}
	catch (error) {
		console.error(error)
		errorToast(error)
		return thunkAPI.rejectWithValue(error)
		}
	}
)

export const mailLogin = createAsyncThunk<AuthOutput, AuthDto>(
	'auth/mailLogin',
	async ({ email, password }, thunkAPI) => {
		try {
			console.log('email', email, 'password', password)
			const { data: loginResponse } = await api.auth.mailLogin({
				email,
				password
			}).catch(
				(error: any) => {
					console.error(JSON.stringify(error))
					errorToast(error)
		throw error
				}
			)
		console.log('loginResponse', loginResponse)
			if (!loginResponse.accessToken)
				return thunkAPI.rejectWithValue(globalErrors.somethingWrong)
			await saveTokensStorage({
				accessToken: loginResponse.accessToken,
				refreshToken: loginResponse.refreshToken
			})
			return loginResponse
		}
		catch (error) {
			console.error(error, 'asdsdaasdasd')
			errorToast(error)
			return thunkAPI.rejectWithValue(error)
		}
	}
)

export const logout = createAsyncThunk('auth/logout', async () => {
	await deleteTokensStorage()
	return {}
})
