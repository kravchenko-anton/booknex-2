import type { StorageFolderType } from '@/backend/storage/storage.types'

export type UploadOutput = {
	name: string
}
export interface FileUploadPayload {
	filename: string
}
export interface ReplacementPayload {
	deleteFilename: string
	folder: StorageFolderType
}
