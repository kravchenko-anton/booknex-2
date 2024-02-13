import axios from 'axios'
import { getAuthUrl, serverURL } from 'global/api-config'
import type {
	AuthResponseType,
	TokensType
} from 'global/services-types/auth-types'
import Cookies from 'js-cookie'

export const getAccessToken = () => {
	console.log('getAccessToken')
	const accessToken = Cookies.get('accessToken')
	return accessToken || null
}

export const getRefreshToken = () => {
	console.log('getRefreshToken')
	const refreshToken = Cookies.get('refreshToken')
	return refreshToken || null
}

export const getTokensStorage = () => {
	console.log('getTokensStorage')
	const accessToken = Cookies.get('accessToken') || null
	const refreshToken = Cookies.get('refreshToken') || null
	return { accessToken, refreshToken }
}

export const saveTokensStorage = (data: TokensType) => {
	console.log('saveTokensStorage', data)
	Cookies.set('accessToken', data.accessToken)
	Cookies.set('refreshToken', data.refreshToken)
}

export const deleteTokensStorage = () => {
	console.log('deleteTokensStorage')
	Cookies.remove('accessToken')
	Cookies.remove('refreshToken')
}

export const getNewTokens = async () => {
	const refreshToken = getRefreshToken()
	if (!refreshToken) throw new Error('No refresh token')
	console.log('refreshToken', refreshToken)
	const response = await axios
		.post<
			string,
			{ data: AuthResponseType }
		>(serverURL + getAuthUrl('/refresh'), { refreshToken })
		.then(result => result.data)
	console.log(
		'response',
		response,
		'response.accessToken',
		response.accessToken
	)
	if (response.accessToken)
		saveTokensStorage({
			accessToken: response.accessToken,
			refreshToken: response.refreshToken
		})
	if (!response.accessToken) throw new Error('No access token')

	return response
}
