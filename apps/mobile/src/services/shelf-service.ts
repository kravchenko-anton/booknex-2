import { getShelfUrl } from '@/services/api-config'
import { request } from '@/services/api/request.api'
import type {
	ShelfManipulationType,
	ShelfType,
	ShortShelfType
} from '@/services/types/shelf-service-types'

export const shelfService = {
	async catalog() {
		return request<ShortShelfType[]>({
			url: getShelfUrl('/catalog'),
			method: 'GET'
		})
	},
	async byId(id: number) {
		return request<
			ShelfType & {
				statistics: [
					{
						count: number | string,
						title: string
					}
				]
			}
		>({
			url: getShelfUrl(`/by-id/${id}`)
		})
	},

	// admin

	async all() {
		return request({
			url: getShelfUrl('/all')
		})
	},
	async create(dto: ShelfManipulationType) {
		return request<ShortShelfType>({
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

	async update(id: number, dto: ShelfManipulationType) {
		return request<ShortShelfType>({
			url: getShelfUrl(`/update/${id}`),
			method: 'PUT',
			data: dto
		})
	}
}
