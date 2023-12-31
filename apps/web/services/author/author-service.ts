import { getAuthorUrl } from '../../../../libs/global/api-config'
import type {
	AllAuthorOutput,
	AllSelectAuthorOutput,
	CreateAuthorOutput
} from '../../../../libs/global/services-types/author-types'
import type {
	CreateAuthorDto,
	EditAuthorDto
} from '../../../backend/src/author/dto/manipulation.author.dto'
import { request } from '../api/request.api'

export const authorService = {
	async all(searchTerm?: string) {
		return request<AllAuthorOutput>({
			url: getAuthorUrl('/all'),
			params: { searchTerm }
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
		return request({
			url: getAuthorUrl(`/delete/${id}`),
			method: 'DELETE'
		})
	}
}
