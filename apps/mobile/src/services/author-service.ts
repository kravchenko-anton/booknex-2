import { getAuthorUrl } from '@/services/api-config'
import { request } from '@/services/api/request.api'
import type { AuthorType } from '@/services/types/author-service-types'

export const authorService = {
	async byId(id: number) {
		return request<AuthorType>({
			url: getAuthorUrl(`/by-id/${id}`)
		})
	},
	// admin

	async create(dto: AuthorType) {
		return request({
			url: getAuthorUrl('/create'),
			method: 'POST',
			data: dto
		})
	},

	async all() {
		return request<AuthorType[]>({
			url: getAuthorUrl('/all')
		})
	},

	async delete(id: number) {
		return request({
			url: getAuthorUrl(`/delete/${id}`),
			method: 'DELETE'
		})
	},

	async update(id: number, dto: AuthorType) {
		return request({
			url: getAuthorUrl(`/update/${id}`),
			method: 'PUT',
			data: dto
		})
	}
}
