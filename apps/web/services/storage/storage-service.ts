import 'multer'
import type { UploadOutput } from '../../../../libs/global/services-types/storage-types'
import type {
	FilenameDto,
	ReplacementDto
} from '../../../backend/src/storage/dto/upload.dto'
import type { StorageFolderType } from '../../../backend/src/storage/storage.types'
import { getStorageUrl } from '../api/api-config'
import { request } from '../api/request.api'

export const storageService = {
	async delete(dto: FilenameDto) {
		return request({
			url: getStorageUrl('/delete'),
			method: 'POST',
			data: dto
		})
	},

	async replacement(file: FormData, dto: ReplacementDto) {
		return request({
			url: getStorageUrl('/replacement'),
			method: 'POST',
			data: {
				...dto,
				file
			}
		})
	},

	async upload(file: FormData, folder: StorageFolderType) {
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
