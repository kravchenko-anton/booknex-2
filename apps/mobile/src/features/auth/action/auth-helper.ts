import EncryptedStorage from 'react-native-encrypted-storage'
import type { TokensType } from './auth-types'

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

export const saveTokensStorage = async (data: TokensType) => {
	await EncryptedStorage.setItem('accessToken', data.accessToken)
	await EncryptedStorage.setItem('refreshToken', data.refreshToken)
	console.log('saveTokensStorage', data)
}

export const deleteTokensStorage = async () => {
	await EncryptedStorage.removeItem('accessToken')
	await EncryptedStorage.removeItem('refreshToken')
	console.log('deleteTokensStorage')
}
