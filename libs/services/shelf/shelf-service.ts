import type { CreateShelfDto, UpdateShelfDto } from '../../../apps/backend/src/shelf/dto/shelf.dto'
import { getShelfUrl } from '../api/api-config'
import { request } from '../api/request.api'
import type { AllShelfOutput, ShelfByIdOutput, ShelfCatalogOutput } from './shelf-types'

export const shelfService = {
	async catalog() {
		return request<ShelfCatalogOutput>({
			url: getShelfUrl('/catalog'),
			method: 'GET'
		})
	},

	async byId(id: number) {
		return request<ShelfByIdOutput>({
			url: getShelfUrl(`/by-id/${id}`),
			method: 'GET'
		})
	},


	async all(searchTerm: string) {
		return request<AllShelfOutput>({
			url: getShelfUrl('/all'),
			method: 'GET',
			params: {
				searchTerm
			}
		})
	},

	async create(dto: CreateShelfDto) {
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

	async update(id: number, dto: UpdateShelfDto) {
		return request({
			url: getShelfUrl(`/update/${id}`),
			method: 'PUT',
			data: dto
		})
	}


}
