import EncryptedStorage from 'react-native-encrypted-storage'
import type { TokensType } from './auth-types'

export const getAccessToken = async () => {
	const accessToken = await EncryptedStorage.getItem('accessToken')
	return accessToken || undefined
}

export const saveTokensStorage = async (data: TokensType) => {
	await EncryptedStorage.setItem('accessToken', data.accessToken)
	await EncryptedStorage.setItem('refreshToken', data.refreshToken)
}

export const deleteTokensStorage = async () => {
	await EncryptedStorage.removeItem('accessToken')
	await EncryptedStorage.removeItem('refreshToken')
}
