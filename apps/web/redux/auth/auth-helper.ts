import type { TokensType } from './auth-types'

export const getAccessToken = async () => {
	const accessToken = window.sessionStorage.getItem('accessToken')
	return accessToken || undefined
}

export const saveTokensStorage = async (data: TokensType) => {
	window.sessionStorage.setItem('accessToken', data.accessToken)
  window.sessionStorage.setItem('refreshToken', data.refreshToken)
}

export const deleteTokensStorage = async () => {
  window.sessionStorage.removeItem('accessToken')
  window.sessionStorage.removeItem('refreshToken')
}
