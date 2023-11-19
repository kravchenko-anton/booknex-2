import { getAuthUrl } from '@/services/api-config'
import { request } from '@/services/api/request.api'

export const authService = {
	async checkEmail(email: string) {
		return request<{
			isExist: boolean
		}>({
			url: getAuthUrl(`/check-email/${email}`),
			method: 'PUT'
		})
	}
}
