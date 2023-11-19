import { IsString } from 'class-validator'
import { StorageFolderType } from '../storage.types'

export class FilenameDto {
	@IsString()
	filename: string
}

export class ReplacementDto {
	@IsString()
	deleteFilename: string

	@IsString()
	folder: StorageFolderType
}
