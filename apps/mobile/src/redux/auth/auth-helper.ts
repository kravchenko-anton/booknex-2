import api from '@/api'
import { errorCatch } from 'global/helpers/catch-error'

import EncryptedStorage from 'react-native-encrypted-storage'

export const getAccessToken = async () => {
	const accessToken = await EncryptedStorage.getItem('accessToken')
	return accessToken || null
}

export const getRefreshToken = async () => {
	const refreshToken = await EncryptedStorage.getItem('refreshToken')
	return refreshToken || null
}

export const saveTokensStorage = async (data: {
	accessToken: string
	refreshToken: string
}) => {
	await EncryptedStorage.setItem('accessToken', data.accessToken)
	await EncryptedStorage.setItem('refreshToken', data.refreshToken)
}

export const deleteTokensStorage = async () => {
	await EncryptedStorage.removeItem('accessToken')
	await EncryptedStorage.removeItem('refreshToken')
}

export const getNewTokens = async () => {
	const refreshToken = await getRefreshToken()
	if (!refreshToken) throw new Error('No refresh token')
	const { data: response } = await api.auth
		.refreshToken({ refreshToken })
		.catch((error: any) => {
			if (errorCatch(error) === 'jwt expired') deleteTokensStorage()
			if (errorCatch(error) === 'jwt malformed') deleteTokensStorage()
			throw error
		})

	if (response.accessToken)
		await saveTokensStorage({
			accessToken: response.accessToken,
			refreshToken: response.refreshToken
		})
	if (!response.accessToken) throw new Error('No access token')

	return response
}
