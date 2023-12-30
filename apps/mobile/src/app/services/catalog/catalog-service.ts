import { getCatalogUrl } from 'global/api-config'
import type {
	ExploreOutput,
	FeaturedOutput,
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
			url: getCatalogUrl('/explore-examples')
		})
	},

	featured() {
		return request<FeaturedOutput>({
			method: 'GET',
			url: getCatalogUrl('/featured')
		})
	},

	explore() {
		return request<ExploreOutput>({
			method: 'GET',
			url: getCatalogUrl('/explore')
		})
	}
}
