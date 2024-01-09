import type { TokensType } from './auth-types'

export const getAccessToken = () => {
	const accessToken = window.sessionStorage.getItem('accessToken')
	return accessToken || null
}

export const saveTokensStorage = (data: TokensType) => {
	window.sessionStorage.setItem('accessToken', data.accessToken)
	window.sessionStorage.setItem('refreshToken', data.refreshToken)
}

export const deleteTokensStorage = () => {
	window.sessionStorage.removeItem('accessToken')
	window.sessionStorage.removeItem('refreshToken')
}
