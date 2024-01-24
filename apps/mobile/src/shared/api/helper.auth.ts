import { saveTokensStorage } from '@/features/auth/action/auth-helper'
import type { AuthResponseType } from '@/features/auth/action/auth-types'
import axios from 'axios'
import { EMULATOR_SERVER_URL, getAuthUrl } from 'global/api-config'
import EncryptedStorage from 'react-native-encrypted-storage'

export const getNewTokens = async () => {
	try {
		const refreshToken = await EncryptedStorage.getItem('refreshToken')
		const response = await axios
			.post<
				string,
				{ data: AuthResponseType }
			>(EMULATOR_SERVER_URL + getAuthUrl('/access-token'), { refreshToken })
			.then(result => result.data)
		if (response.accessToken)
			await saveTokensStorage({
				accessToken: response.accessToken,
				refreshToken: response.refreshToken
			})
		if (!response.accessToken) throw new Error('No access token')

		return response
	} catch (error) {
		console.log(error)
		throw error
	}
}
