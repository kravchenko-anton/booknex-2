import { getAuthorUrl } from 'global/api-config'
import type { AllAuthorOutput, InfoByIdOutput } from 'global/services-types/author-types'
import { request } from '../api/request.api'

export const authorService = {
	async byId(id: number) {
		return request<InfoByIdOutput>({
			url: getAuthorUrl(`/by-id/${id}`)
		})
	},
	
	async all(searchTerm?: string) {
		return request<AllAuthorOutput>({
			url: getAuthorUrl('/all'),
			params: { searchTerm }
		})
	}
	
}
