import { getCatalogUrl } from 'global/api-config'
import {
	CatalogOutput,
	SearchExamplesOutput,
	SearchOutput
} from 'global/services-types/catalog.types'
import { request } from '../api/request.api'

export const catalogService = {
	async search(searchTerm: string) {
		return request<SearchOutput>({
			method: 'GET',
			url: getCatalogUrl(`/search/${searchTerm}`)
		})
	},

	async searchExamples() {
		return request<SearchExamplesOutput>({
			method: 'GET',
			url: getCatalogUrl('/search-examples')
		})
	},

	catalog() {
		return request<CatalogOutput>({
			method: 'GET',
			url: getCatalogUrl('/')
		})
	}
}
