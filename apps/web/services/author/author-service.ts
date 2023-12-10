import type {
	AllAuthorOutput,
	CreateAuthorOutput,
	InfoByIdOutput
} from '../../../../libs/global/services-types/author-types'
import type {
	CreateAuthorDto,
	EditAuthorDto
} from '../../../backend/src/author/dto/manipulation.author.dto'
import { getAuthorUrl } from '../api/api-config'
import { request } from '../api/request.api'

export const authorService = {
	async byId(id: number) {
		return request<InfoByIdOutput>({
			url: getAuthorUrl(`/by-id/${id}`)
		})
	},

	async all(searchTerm?: string) {
		return request<AllAuthorOutput>({
			url: getAuthorUrl('/all'),
			params: { searchTerm }
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
