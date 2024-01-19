import { getUsersUrl } from 'global/api-config'
import type {
	FavoriteListOutput,
	UserLibraryOutput,
	UserProfileOutput
} from 'global/services-types/user-types'
import type {
	UserUpdatePasswordDto,
	UserUpdateSelectedGenresDto
} from '../../../../../backend/src/user/dto/user.update.dto'
import { request } from '../api/request.api'

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
	async updatePassword(dto: UserUpdatePasswordDto) {
		return request({
			url: getUsersUrl('/update-password'),
			method: 'POST',
			data: dto
		})
	},

	async favoriteList() {
		return request<FavoriteListOutput>({
			url: getUsersUrl('/favorite-list'),
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
		return request({
			url: getUsersUrl(`/toggle-save/${id}`),
			method: 'PATCH'
		})
	},
	async updateRecommendations(dto: UserUpdateSelectedGenresDto) {
		return request({
			url: getUsersUrl('/update-recommendations'),
			method: 'GET',
			data: dto
		})
	}
}
