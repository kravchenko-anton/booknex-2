import { getShelfUrl } from '@/global/api-config'
import type { AllShelfOutput } from '@/global/services-types/collection-types'
import type {
	CreateCollectionDto,
	UpdateCollectionDto
} from '../../../backend/src/collection/dto/collection.dto'
import { request } from '../api/request.api'

export const shelfService = {
	async all(searchTerm: string) {
		return request<AllShelfOutput>({
			url: getShelfUrl('/all'),
			method: 'GET',
			params: {
				searchTerm
			}
		})
	},

	async create(dto: CreateCollectionDto) {
		return request({
			url: getShelfUrl('/create'),
			method: 'POST',
			data: dto
		})
	},

	async delete(id: number) {
		return request({
			url: getShelfUrl(`/delete/${id}`),
			method: 'DELETE'
		})
	},

	async update(id: number, dto: UpdateCollectionDto) {
		return request({
			url: getShelfUrl(`/update/${id}`),
			method: 'PUT',
			data: dto
		})
	}
}
