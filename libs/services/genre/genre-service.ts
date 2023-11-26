import { getGenresUrl } from '../api/api-config'
import { request } from '../api/request.api'
import type { AllGenreOutput, GenreByIdOutput } from './genre-types'

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
