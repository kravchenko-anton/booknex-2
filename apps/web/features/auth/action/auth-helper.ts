import type { TokensType } from './auth-types'

export const getAccessToken = () => {
	console.log('getAccessToken')
	const accessToken = window.sessionStorage.getItem('accessToken')
	return accessToken || null
}

export const saveTokensStorage = (data: TokensType) => {
	console.log('saveTokensStorage', data)
	window.sessionStorage.setItem('accessToken', data.accessToken)
	window.sessionStorage.setItem('refreshToken', data.refreshToken)
}

export const deleteTokensStorage = () => {
	console.log('deleteTokensStorage')
	window.sessionStorage.removeItem('accessToken')
	window.sessionStorage.removeItem('refreshToken')
}
