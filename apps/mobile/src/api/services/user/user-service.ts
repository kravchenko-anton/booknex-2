import type { UserUpdateSelectedGenresDto } from 'backend/src/user/dto'
import { getUsersUrl } from 'global/api-config'
import type {
	UserLibraryOutput,
	UserProfileOutput
} from 'global/services-types/user-types'
import { request } from '../../request.api'

export const userServices = {
	async profile() {
		return request<UserProfileOutput>({
			url: getUsersUrl('/profile'),
			method: 'GET'
		})
	},

	async library() {
		return request<UserLibraryOutput>({
			url: getUsersUrl('/library'),
			method: 'GET'
		})
	},
	async startReading(id: number) {
		return request({
			url: getUsersUrl(`/start-reading/${id}`),
			method: 'PATCH'
		})
	},
	async finishReading(id: number) {
		return request({
			url: getUsersUrl(`/finish-reading/${id}`),
			method: 'PATCH'
		})
	},
	async toggleSave(id: number) {
		return request<boolean>({
			url: getUsersUrl(`/toggle-save/${id}`),
			method: 'PATCH'
		})
	},
	async updateRecommendations(dto: UserUpdateSelectedGenresDto) {
		return request({
			url: getUsersUrl('/update-recommendations'),
			method: 'POST',
			data: dto
		})
	},
	async recommendationGenres() {
		return request<{ id: number; name: string }[]>({
			url: getUsersUrl('/recommendation-genres'),
			method: 'GET'
		})
	},
	async isSaved(id: number) {
		return request<boolean>({
			url: getUsersUrl(`/is-saved/${id}`),
			method: 'GET'
		})
	}
}
