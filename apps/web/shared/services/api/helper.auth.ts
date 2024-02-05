import {
	getRefreshToken,
	saveTokensStorage
} from '@/features/auth/action/auth-helper'
import type { AuthResponseType } from '@/features/auth/action/auth-types'
import axios from 'axios'
import { SERVER_URL, getAuthUrl } from 'global/api-config'

export const getNewTokens = async () => {
	const refreshToken = getRefreshToken()
	if (!refreshToken) throw new Error('No refresh token')
	const response = await axios
		.post<
			string,
			{ data: AuthResponseType }
		>(SERVER_URL + getAuthUrl('/refresh'), { refreshToken })
		.then(result => result.data)
	if (response.accessToken)
		saveTokensStorage({
			accessToken: response.accessToken,
			refreshToken: response.refreshToken
		})
	if (!response.accessToken) throw new Error('No access token')

	return response
}
