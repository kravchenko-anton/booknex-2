import { getAuthUrl } from '../../../../libs/global/api-config'
import type { CheckEmailOutput } from '../../../../libs/global/services-types/auth-types'
import { request } from '../api/request.api'

export const authService = {
	checkEmail(email: string) {
		return request<CheckEmailOutput>({
			url: getAuthUrl(`/check-email/${email}`),
			method: 'PUT'
		})
	}
}
