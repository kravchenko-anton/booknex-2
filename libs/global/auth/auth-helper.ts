import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store'
import type { TokensType } from './auth-types'

export const getAccessToken = async () => {
	const accessToken = await getItemAsync('accessToken')
	return accessToken || undefined
}

export const saveTokensStorage = async (data: TokensType) => {
	await setItemAsync('accessToken', data.accessToken)
	await setItemAsync('refreshToken', data.refreshToken)
}

export const deleteTokensStorage = async () => {
	await deleteItemAsync('accessToken')
	await deleteItemAsync('refreshToken')
}
