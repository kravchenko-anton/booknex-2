import { getUsersUrl } from 'global/api-config'
import type {
	FavoriteListOutput,
	ToggleOutput,
	UserLibraryOutput,
	UserProfileOutput
} from 'global/services-types/user-types'
import type { UserUpdatePasswordDto } from '../../../../../backend/src/user/dto/user.update.dto'
import type { UserLibraryCategoryType } from '../../../../../backend/src/user/user.types'
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

	async toggle(id: number, type: UserLibraryCategoryType) {
		return request<ToggleOutput>({
			url: getUsersUrl(`/toggle/${id}`),
			method: 'PATCH',
			params: {
				type
			}
		})
	}
}
