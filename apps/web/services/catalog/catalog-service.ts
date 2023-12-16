import { getCatalogUrl } from '../../../../libs/global/api-config'
import type { SearchOutput } from '../../../../libs/global/services-types/catalog.types'
import { request } from '../api/request.api'

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
			url: getCatalogUrl('/search-examples')
		})
	},
	
	async catalog() {
		return request<SearchOutput>({
			method: 'GET',
			url: getCatalogUrl('/')
		})
	}
}
