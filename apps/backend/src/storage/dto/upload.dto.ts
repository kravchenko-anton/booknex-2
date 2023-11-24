import { IsString } from 'class-validator'
import type { FileUploadPayload, ReplacementPayload } from '../../../../../libs/shared-types/src/storage-types'
import { StorageFolderType } from '../storage.types'


export class FilenameDto implements FileUploadPayload {
	@IsString()
	filename: string
}



export class ReplacementDto implements ReplacementPayload {
	@IsString()
	deleteFilename: string

	@IsString()
	folder: StorageFolderType
}
