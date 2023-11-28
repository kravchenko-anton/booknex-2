import type { CheckEmailOutput } from '../../../../libs/global/services-types/auth-types'
import { getAuthUrl } from '../api/api-config'
import { request } from '../api/request.api'

export const authService = {
	checkEmail(email: string) {
		return request<CheckEmailOutput>({
			url: getAuthUrl(`/check-email/${email}`),
			method: 'PUT'
		})
	}
}
