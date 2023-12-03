import type {
	FavoriteListOutput,
	ToggleOutput,
	UserLibraryOutput,
	UserProfileOutput
} from '../../../../libs/global/services-types/user-types'
import type { FilenameDto } from '../../../backend/src/storage/dto/upload.dto'
import type {
	UserUpdateBioDto,
	UserUpdatePasswordDto
} from '../../../backend/src/user/dto/user.update.dto'
import type { UserLibraryCategoryType } from '../../../backend/src/user/user.types'
import { getUsersUrl } from '../api/api-config'
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

	async updateBio(dto: UserUpdateBioDto) {
		return request({
			url: getUsersUrl('/update-bio'),
			method: 'POST',
			data: dto
		})
	},

	async updatePassword(dto: UserUpdatePasswordDto) {
		return request({
			url: getUsersUrl('/update-password'),
			method: 'POST',
			data: dto
		})
	},

	async updatePicture(dto: FilenameDto) {
		return request({
			url: getUsersUrl('/update-picture'),
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

	async toggle(id: string, type: UserLibraryCategoryType) {
		return request<ToggleOutput>({
			url: getUsersUrl(`/toggle/${id}`),
			method: 'PATCH',
			params: {
				type
			}
		})
	},

	async all(searchTerm: string) {
		return request({
			url: getUsersUrl('/all'),
			method: 'GET',
			params: {
				searchTerm
			}
		})
	},

	async delete(id: string) {
		return request({
			url: getUsersUrl(`/delete/${id}`),
			method: 'DELETE'
		})
	}
}
