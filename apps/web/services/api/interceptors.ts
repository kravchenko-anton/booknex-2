import {
	deleteTokensStorage,
	getAccessToken,
	getNewTokens
} from '@/redux/auth/auth-helper'
import { errorToast } from '@/utils/toast'
import axios from 'axios'
import { serverURL } from 'global/api-config'
import { errorCatch } from 'global/helpers/catch-error'

const instance = axios.create({
	baseURL: serverURL,

	headers: {
		'Content-Type': 'application/json'
	}
})
instance.interceptors.request.use(async config => {
	const accessToken = getAccessToken()

	if (config.headers && accessToken)
		config.headers.Authorization = `Bearer ${accessToken}`

	return config
})
//TODO: переделать тут чтобы если токен не валидный ошибка была по нормальному
instance.interceptors.response.use(
	config => config,
	async error => {
		const originalRequest = error.config
		console.log('error in intercept or', error)
		if (error.response.status === 403) return deleteTokensStorage()
		if (
			(error.response.status === 401 ||
				errorCatch(error) === 'jwt expired' ||
				errorCatch(error) === 'jwt malformed' ||
				errorCatch(error) === 'jwt must be provided') &&
			error.config &&
			!error.config._isRetry
		) {
			originalRequest._isRetry = true
			try {
				await getNewTokens()
				return await axios.request({
					...originalRequest,
					headers: {
						...originalRequest.headers,
						Authorization: `Bearer ${getAccessToken()}`
					}
				})
			} catch {
				if (
					errorCatch(error) === 'jwt expired' ||
					errorCatch(error) === 'jwt must be provided' ||
					errorCatch(error) === 'jwt malformed'
				) {
					return deleteTokensStorage()
				}
			}
		}
		if (error.response.status === 401) return
		errorToast(error)
		throw errorCatch(error)
	}
)

export default instance
