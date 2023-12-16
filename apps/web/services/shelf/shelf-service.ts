import { getShelfUrl } from '../../../../libs/global/api-config'
import type { AllShelfOutput, ShelfByIdOutput, ShelfCatalogOutput } from '../../../../libs/global/services-types/shelf-types'
import type { CreateShelfDto, UpdateShelfDto } from '../../../backend/src/shelf/dto/shelf.dto'
import { request } from '../api/request.api'

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
