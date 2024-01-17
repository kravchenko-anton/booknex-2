import { getAuthorUrl } from 'global/api-config'
import type {
	AllAuthorOutput,
	AllSelectAuthorOutput,
	CreateAuthorOutput
} from 'global/services-types/author-types'
import type {
	CreateAuthorDto,
	EditAuthorDto
} from '../../../backend/src/author/dto/manipulation.author.dto'
import { request } from '../api/request.api'

export const authorService = {
	async all(parameters: { page: number; searchTerm?: string }) {
		return request<AllAuthorOutput>({
			url: getAuthorUrl('/all'),
			params: parameters
		})
	},

	async allSelect(searchTerm?: string) {
		return request<AllSelectAuthorOutput>({
			url: getAuthorUrl('/all/select'),
			params: { searchTerm }
		})
	},

	async exist(name: string) {
		return request<{
			id: number
			name: string
		} | null>({
			url: getAuthorUrl(`/exist/${name}`),
			method: 'PUT'
		})
	},

	async create(dto: CreateAuthorDto): Promise<CreateAuthorOutput> {
		return request({
			url: getAuthorUrl('/create'),
			method: 'POST',
			data: dto
		})
	},

	async update(id: number, dto: EditAuthorDto) {
		return request({
			url: getAuthorUrl(`/update/${id}`),
			method: 'PUT',
			data: dto
		})
	},

	async delete(id: number) {
		return request<null>({
			url: getAuthorUrl(`/delete/${id}`),
			method: 'DELETE'
		})
	}
}
