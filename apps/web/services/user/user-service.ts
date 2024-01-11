import { getUsersUrl } from 'global/api-config'
import type { AllUsersOutput } from 'global/services-types/user-types'
import { request } from '../api/request.api'

export const userServices = {
	async all(searchTerm: string) {
		return request<AllUsersOutput>({
			url: getUsersUrl('/all'),
			method: 'GET',
			params: {
				searchTerm
			}
		})
	},

	async delete(id: string) {
		return request({
			url: getUsersUrl(`/delete/${id}`),
			method: 'DELETE'
		})
	}
}
