import {
	deleteTokensStorage,
	getAccessToken,
	getNewTokens
} from '@/redux/auth/auth-helper'
import { errorToast } from '@/utils/toast'
import axios from 'axios'
import { emulatorServerURL } from 'global/api-config'
import { errorCatch } from 'global/helpers/catch-error'

const instance = axios.create({
	baseURL: emulatorServerURL,
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
		if (!error.response) return
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
				const accessToken = await getAccessToken()
				return await axios.request({
					...originalRequest,
					headers: {
						...originalRequest.headers,
						Authorization: `Bearer ${accessToken}`
					}
				})
			} catch {
				console.log('catch', error)
				if (
					errorCatch(error) === 'jwt expired' ||
					errorCatch(error) === 'jwt must be provided'
				) {
					await deleteTokensStorage()
				}
			}
		}
		errorToast(error)
		throw error
	}
)
export default instance
