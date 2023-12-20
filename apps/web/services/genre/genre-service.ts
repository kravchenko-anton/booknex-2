import { getGenresUrl } from '../../../../libs/global/api-config'
import type {
	AllGenreOutput,
	GenreByIdOutput
} from '../../../../libs/global/services-types/genre-types'
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
