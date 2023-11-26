import { getGenresUrl } from '@/services/api-config'
import { request } from '@/services/api/request.api'
import type { GenreByIdType, GenreType } from '@/services/types/genre-service-types'

export const genreService = {
	async getGenres() {
		return request<GenreType[]>({
			url: getGenresUrl('/'),
			method: 'GET'
		})
	},

	async byId(id: number) {
		return request<GenreByIdType>({
			url: getGenresUrl(`/by-id/${id}`),
			method: 'GET'
		})
	}
}
