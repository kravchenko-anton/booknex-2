import type { FilenameDto, ReplacementDto } from '../../../apps/backend/src/storage/dto/upload.dto'
import type { StorageFolderType } from '../../../apps/backend/src/storage/storage.types'
import { getStorageUrl } from '../api/api-config'
import { request } from '../api/request.api'
import type { UploadOutput } from './storage-types'

export const storageService = {
	async delete(dto: FilenameDto) {
		return request({
			url: getStorageUrl('/delete'),
			method: 'POST',
			data: dto
		})
	},

	async replacement(
		file: Express.Multer.File,
		dto: ReplacementDto
	) {
		return request({
			url: getStorageUrl('/replacement'),
			method: 'POST',
			data: {
				...dto,
				file
			}
		})
	},

	async upload(
		file: Express.Multer.File,
		folder: StorageFolderType
	) {
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
