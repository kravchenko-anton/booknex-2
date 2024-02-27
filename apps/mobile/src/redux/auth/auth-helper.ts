import api from '@/api'

import EncryptedStorage from 'react-native-encrypted-storage'

export const getAccessToken = async () => {
	const accessToken = await EncryptedStorage.getItem('accessToken')
	console.log('accessToken', accessToken, 'getAccessToken')
	return accessToken || null
}

export const getRefreshToken = async () => {
	const refreshToken = await EncryptedStorage.getItem('refreshToken')
	console.log('refreshToken', refreshToken, 'getRefreshToken')
	return refreshToken || null
}

export const saveTokensStorage = async (data: {
	accessToken: string
	refreshToken: string
}) => {
	await EncryptedStorage.setItem('accessToken', data.accessToken)
	await EncryptedStorage.setItem('refreshToken', data.refreshToken)
	console.log('saveTokensStorage', data)
}

export const deleteTokensStorage = async () => {
	await EncryptedStorage.removeItem('accessToken')
	await EncryptedStorage.removeItem('refreshToken')
	console.log('deleteTokensStorage')
}

export const getNewTokens = async () => {
	const refreshToken = await getRefreshToken()
	if (!refreshToken) throw new Error('No refresh token')
	console.log('refreshToken', refreshToken)
	const { data: response } = await api.auth.refreshToken({ refreshToken })
	console.log(
		'response',
		response,
		'response.accessToken',
		response.accessToken
	)
	if (response.accessToken)
		await saveTokensStorage({
			accessToken: response.accessToken,
			refreshToken: response.refreshToken
		})
	if (!response.accessToken) throw new Error('No access token')

	return response
}