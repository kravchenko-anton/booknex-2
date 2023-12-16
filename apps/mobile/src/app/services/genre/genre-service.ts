import { getGenresUrl } from 'global/api-config'
import type { AllGenreOutput, GenreByIdOutput } from 'global/services-types/genre-types'
import { request } from '../api/request.api'

export const genreService = {
	async all() {
		return request<AllGenreOutput>({
			url: getGenresUrl('/'),
			method: 'GET'
		})
	},
	
	async byId(id: number) {
		return request<GenreByIdOutput>({
			url: getGenresUrl(`/by-id/${id}`),
			method: 'GET'
		})
	}
}
