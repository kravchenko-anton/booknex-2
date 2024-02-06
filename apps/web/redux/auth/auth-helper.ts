import Cookies from 'js-cookie'
import type { TokensType } from './auth-types'

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
