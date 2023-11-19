import type { UserUpdateBioTypes } from '@/screens/profile/update-profile/update-bio/update-bio-types'
import type { EditPasswordTypes } from '@/screens/profile/update-profile/update-password/update-password-types'
import { getUsersUrl } from '@/services/api-config'
import { request } from '@/services/api/request.api'
import type {
	GetMoreType,
	UserLibraryFieldsType,
	UserLibraryType,
	UserProfileTypes
} from '@/services/types/user-services-types'

export const userServices = {
	async getProfile() {
		return request<UserProfileTypes>({
			url: getUsersUrl('/profile'),
			method: 'GET'
		})
	},
	async getLibrary() {
		return request<UserLibraryType>({
			url: getUsersUrl('/library'),
			method: 'GET'
		})
	},

	async getMore(type: keyof UserLibraryFieldsType) {
		return request<GetMoreType<typeof type>>({
			url: getUsersUrl(`/library/${type}`),
			method: 'GET'
		})
	},

	async getFavoriteList() {
		return request<UserLibraryFieldsType>({
			url: getUsersUrl('/favorite-list'),
			method: 'GET'
		})
	},
	async updateBio(dto: UserUpdateBioTypes) {
		return request({
			url: getUsersUrl('/update-bio'),
			method: 'POST',
			data: dto
		})
	},

	async updatePassword(dto: EditPasswordTypes) {
		return request({
			url: getUsersUrl('/update-password'),
			method: 'POST',
			data: dto
		})
	},
	async updatePicture(fileName: string) {
		return request({
			url: getUsersUrl('/update-picture'),
			method: 'POST',
			data: {
				filename: fileName
			}
		})
	},

	async toggle(type: keyof UserLibraryFieldsType, id: number) {
		return request<{ isExist: boolean, message: string; }>({
			url: getUsersUrl(`/toggle/${type}/${id}`),
			method: 'PATCH'
		})
	},

	// admin

	async all() {
		return request({
			url: getUsersUrl('/all')
		})
	},

	async delete(id: number) {
		return request({
			url: getUsersUrl(`/delete/${id}`),
			method: 'DELETE'
		})
	}
}
