import { getShelfUrl } from 'global/api-config'
import type { ShelfByIdOutput } from 'global/services-types/collection-types'
import { request } from '../api/request.api'

export const collectionService = {
	byId(id: number) {
		return request<ShelfByIdOutput>({
			url: getShelfUrl(`/by-id/${id}`),
			method: 'GET'
		})
	}
}
