import axios from 'axios'
import { getAuthUrl, SERVER_URL } from '../../../../libs/global/api-config'
import { saveTokensStorage } from '../../redux/auth/auth-helper'
import type { AuthResponseType } from '../../redux/auth/auth-types'

export const getNewTokens = async () => {
	try {
		const refreshToken = window.sessionStorage.getItem('refreshToken')
		const response = await axios
			.post<string, { data: AuthResponseType }>(
				SERVER_URL + getAuthUrl('/access-token'),
				{ refreshToken }
			)
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
