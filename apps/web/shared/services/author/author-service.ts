import type {
	CreateAuthorDto,
	EditAuthorDto
} from 'backend/src/author/dto/manipulation.author.dto'
import { getAuthorUrl } from 'global/api-config'
import type {
	AllAuthorOutput,
	AllSelectAuthorOutput,
	CreateAuthorOutput
} from 'global/services-types/author-types'

import { request } from '../api/request.api'

export const authorService = {
	async all(parameters: { page: number; searchTerm?: string }) {
		return request<AllAuthorOutput>({
			url: getAuthorUrl('admin/all'),
			params: parameters
		})
	},

	async allSelect(searchTerm?: string) {
		return request<AllSelectAuthorOutput>({
			url: getAuthorUrl('admin/all/select'),
			params: { searchTerm }
		})
	},

	async exist(name: string) {
		return request<{
			id: number
			name: string
		} | null>({
			url: getAuthorUrl(`/admin/exist/${name}`),
			method: 'PUT'
		})
	},

	async create(dto: CreateAuthorDto): Promise<CreateAuthorOutput> {
		return request({
			url: getAuthorUrl('/admin/create'),
			method: 'POST',
			data: dto
		})
	},

	async update(id: number, dto: EditAuthorDto) {
		return request({
			url: getAuthorUrl(`/admin/update/${id}`),
			method: 'PUT',
			data: dto
		})
	},

	async delete(id: number) {
		return request<null>({
			url: getAuthorUrl(`/admin/delete/${id}`),
			method: 'DELETE'
		})
	}
}
