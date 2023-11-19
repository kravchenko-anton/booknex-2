import { getStorageUrl } from '@/services/api-config'
import { request } from '@/services/api/request.api'
import type { StorageFolderType } from '@/services/types/storage-service-types'

export const storageService = {
	async upload(file: FormData, type: StorageFolderType) {
		return request<{ name: string }>({
			url: getStorageUrl(`/${type}`),
			method: 'POST',
			data: file,
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
	},

	async replacement(formData: FormData) {
		return request<{ name: string }>({
			url: getStorageUrl('/replacement'),
			method: 'POST',
			data: formData,
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
	},

	async delete(filename: string) {
		return request({
			url: getStorageUrl('/delete'),
			method: 'POST',
			data: {
				filename
			}
		})
	}
}
