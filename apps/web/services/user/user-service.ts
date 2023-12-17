import { getUsersUrl } from '../../../../libs/global/api-config'
import { request } from '../api/request.api'

export const userServices = {
	
	async all(searchTerm: string) {
		return request({
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
