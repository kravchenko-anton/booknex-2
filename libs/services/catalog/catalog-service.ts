import { getCatalogUrl } from '../api/api-config'
import { request } from '../api/request.api'
import type { SearchOutput } from './catalog.types'

export const catalogService = {
	async search(searchTerm: string) {
		return request<SearchOutput>({
			method: 'GET',
			url: getCatalogUrl(`/search/${searchTerm}`)
		})
	},

	async searchExamples() {
		return request<SearchOutput>({
			method: 'GET',
			url: getCatalogUrl(`/search-examples`)
		})
	},

	async catalog() {
		return request<SearchOutput>({
			method: 'GET',
			url: getCatalogUrl(`/`)
		})
	}

}
