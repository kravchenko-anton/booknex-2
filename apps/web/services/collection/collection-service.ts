import type {
	CreateCollectionDto,
	UpdateCollectionDto
} from 'backend/src/collection/dto/collection.dto'
import { getCollectionUrl } from 'global/api-config'
import type { AllCollectionOutput } from 'global/services-types/collection-types'
import { request } from '../api/request.api'

export const collectionService = {
	async all(searchTerm: string) {
		return request<AllCollectionOutput>({
			url: getCollectionUrl('/all'),
			method: 'GET',
			params: {
				searchTerm
			}
		})
	},

	async create(dto: CreateCollectionDto) {
		return request({
			url: getCollectionUrl('/create'),
			method: 'POST',
			data: dto
		})
	},

	async delete(id: number) {
		return request({
			url: getCollectionUrl(`/delete/${id}`),
			method: 'DELETE'
		})
	},

	async update(id: number, dto: UpdateCollectionDto) {
		return request({
			url: getCollectionUrl(`/update/${id}`),
			method: 'PUT',
			data: dto
		})
	}
}
