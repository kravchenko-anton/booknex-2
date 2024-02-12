import {
	deleteTokensStorage,
	getAccessToken
} from '@/features/auth/action/auth-helper'
import { getNewTokens } from '@/features/auth/getNewTokens'
import axios from 'axios'
import { EMULATOR_SERVER_URL } from 'global/api-config'
import { errorCatch } from 'global/utils/catch-error'

const instance = axios.create({
	baseURL: EMULATOR_SERVER_URL,
	headers: {
		'Content-Type': 'application/json'
	}
})

instance.interceptors.request.use(async config => {
	const accessToken = await getAccessToken()
	console.log('accessToken', accessToken, 'interceptors.request.use')
	if (config.headers && accessToken)
		config.headers.Authorization = `Bearer ${accessToken}`

	return config
})

instance.interceptors.response.use(
	config => config,
	async error => {
		const originalRequest = error.config
		if (!error.response) throw new Error('Network Error')
		if (
			(error.response.status === 401 ||
				errorCatch(error) === 'jwt expired' ||
				errorCatch(error) === 'jwt must be provided') &&
			error.config &&
			!error.config._isRetry
		) {
			originalRequest._isRetry = true
			try {
				await getNewTokens()
				return await instance.request(originalRequest)
			} catch {
				console.log('catch', error)
				if (
					error.response?.status === 401 ||
					errorCatch(error) === 'jwt expired' ||
					errorCatch(error) === 'jwt must be provided'
				) {
					await deleteTokensStorage()
				}
			}
		}

		throw error
	}
)
export default instance