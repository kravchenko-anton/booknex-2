import { errorToast, successToast } from '@/utils/toast'
import { Role } from '@prisma/client'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { GlobalErrorsEnum } from 'backend/src/utils/errors'
import type { AuthDto, AuthResponseDto } from 'global/api-client'
import { serverURL } from 'global/api-config'

import { deleteTokensStorage, saveTokensStorage } from './auth-helper'

export const mailLogin = createAsyncThunk<AuthResponseDto, AuthDto>(
	'auth/mailLogin',
	async ({ email, password }, thunkAPI) => {
		try {
			const loginResponse = await axios
				.post<AuthResponseDto>(serverURL + 'auth/mail-login', {
					email,
					password
				})
				.then(response => response.data)
			if (loginResponse.user.role !== Role.admin)
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
	AuthResponseDto,
	{
		socialId: string
	}
>('auth/googleLogin', async ({ socialId }, thunkAPI) => {
	try {
		const loginResponse = await axios
			.post<AuthResponseDto>(serverURL + 'auth/google-sign', {
				socialId
			})
			.then(response => response.data)
		if (loginResponse.user.role !== Role.admin)
			return thunkAPI.rejectWithValue(GlobalErrorsEnum.somethingWrong)
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

export const logout = createAsyncThunk('auth/logout', () => {
	try {
		successToast('Logout successfully')
		deleteTokensStorage()
	} catch (error) {
		errorToast(error)
	}
	return {}
})
