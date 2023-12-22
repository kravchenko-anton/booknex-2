import { getShelfUrl } from 'global/api-config'
import {
	ShelfByIdOutput,
	ShelfCatalogOutput
} from 'global/services-types/shelf-types'
import { request } from '../api/request.api'

export const shelfService = {
	catalog() {
		return request<ShelfCatalogOutput>({
			url: getShelfUrl('/catalog'),
			method: 'GET'
		})
	},

	byId(id: number) {
		return request<ShelfByIdOutput>({
			url: getShelfUrl(`/by-id/${id}`),
			method: 'GET'
		})
	}
}
