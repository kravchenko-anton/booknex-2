import { getAuthUrl } from '../api/api-config'
import { request } from '../api/request.api'
import type { CheckEmailOutput } from './auth-types'

export const authService = {
	checkEmail(email: string) {
		return request<CheckEmailOutput>({
			url: getAuthUrl(`/check-email/${email}`),
			method: 'PUT'
		})
	}
}
