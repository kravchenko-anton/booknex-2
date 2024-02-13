import { errorToast, successToast } from '@/utils/toast'
import { Role } from '@prisma/client'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { GlobalErrorsEnum } from 'backend/src/utils/errors'
import { getAuthUrl, serverURL } from 'global/api-config'
import type {
	AuthFieldsType,
	AuthResponseType
} from 'global/services-types/auth-types'
import { deleteTokensStorage, saveTokensStorage } from './auth-helper'

export const mailLogin = createAsyncThunk<AuthResponseType, AuthFieldsType>(
	'auth/mailLogin',
	async ({ email, password }, thunkAPI) => {
		try {
			const loginResponse = await axios
				.post<AuthResponseType>(serverURL + getAuthUrl('/mail-login'), {
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
	AuthResponseType,
	{
		socialId: string
	}
>('auth/googleLogin', async ({ socialId }, thunkAPI) => {
	try {
		const loginResponse = await axios
			.post<AuthResponseType>(serverURL + getAuthUrl('/google-sign'), {
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
