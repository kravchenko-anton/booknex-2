import { getCatalogUrl } from 'global/api-config'
import type {
	FeaturedOutput,
	SearchOutput
} from 'global/services-types/catalog.types'
import { request } from '../../request.api'

export const catalogService = {
	async search(searchTerm: string) {
		return request<SearchOutput>({
			method: 'GET',
			url: getCatalogUrl(`/search/${searchTerm}`)
		})
	},

	featured() {
		return request<FeaturedOutput>({
			method: 'GET',
			url: getCatalogUrl('/featured')
		})
	}
}
