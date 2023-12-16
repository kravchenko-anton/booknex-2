import { getStorageUrl } from 'global/api-config'
import type { FileUploadPayload, ReplacementPayload, UploadOutput } from 'global/services-types/storage-types'
import type { StorageFolderEnum } from '../../../../../backend/src/storage/storage.types'
import { request } from '../api/request.api'

export const storageService = {
	async delete(dto: FileUploadPayload) {
		return request({
			url: getStorageUrl('/delete'),
			method: 'POST',
			data: dto
		})
	},
	
	async replacement(file: FormData, dto: ReplacementPayload) {
		return request({
			url: getStorageUrl('/replacement'),
			method: 'POST',
			data: {
				...dto,
				file
			}
		})
	},
	
	async upload(file: FormData, folder: StorageFolderEnum) {
		return request<UploadOutput>({
			url: getStorageUrl(`/${folder}`),
			method: 'POST',
			data: file,
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
	}
}
