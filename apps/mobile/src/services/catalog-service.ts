import { getCatalogUrl } from '@/services/api-config'
import { request } from '@/services/api/request.api'
import type {
	CatalogType,
	SearchBookType,
	TopSearchersType
} from '@/services/types/catalog-service-types'

export const catalogService = {
	async search(query: string) {
		return request<SearchBookType[]>({
			url: getCatalogUrl(`/search/${query}`),
			method: 'GET'
		})
	},
	async getSearchExamples() {
		return request<TopSearchersType[]>({
			url: getCatalogUrl('/search-examples'),
			method: 'GET'
		})
	},
	async catalog() {
		return request<CatalogType>({
			url: getCatalogUrl('/'),
			method: 'GET'
		})
	}
}
