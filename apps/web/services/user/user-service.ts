import { getUsersUrl } from 'global/api-config'
import type { AllUsersOutput } from 'global/services-types/user-types'
import { request } from '../api/request.api'

export const userServices = {
	async all(parameters: { page: number; searchTerm?: string }) {
		return request<AllUsersOutput>({
			url: getUsersUrl('/all'),
			method: 'GET',
			params: parameters
		})
	},

	async delete(id: number) {
		return request<null>({
			url: getUsersUrl(`/delete/${id}`),
			method: 'DELETE'
		})
	}
}
