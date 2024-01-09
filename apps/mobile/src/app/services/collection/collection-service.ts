import { getCollectionUrl } from 'global/api-config'
import type { CollectionByIdOutput } from 'global/services-types/collection-types'
import { request } from '../api/request.api'

export const collectionService = {
	byId(id: number) {
		return request<CollectionByIdOutput>({
			url: getCollectionUrl(`/by-id/${id}`),
			method: 'GET'
		})
	}
}
