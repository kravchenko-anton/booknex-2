import { IsString } from 'class-validator'
import type { FileUploadPayload, ReplacementPayload } from '../../../../../libs/global/services-types/storage-types'
import { StorageFolderType } from '../storage.types'

export class FilenameDto implements FileUploadPayload {
	@IsString() filename: string
}

export class ReplacementDto implements ReplacementPayload {
	@IsString() deleteFilename: string
	@IsString() folder: StorageFolderType
}
