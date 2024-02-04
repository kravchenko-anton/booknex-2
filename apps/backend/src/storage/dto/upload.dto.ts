import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'
import type {
	FileUploadPayload,
	ReplacementPayload
} from '../../../../../libs/global/services-types/storage-types'
import { StorageFolderType } from '../storage.types'

export class FilenameDto implements FileUploadPayload {
	@ApiProperty({
		example: 'file.jpg',
		description: 'Filename to upload',
		required: true
	})
	@IsString()
	filename: string
}

export class ReplacementDto implements ReplacementPayload {
	@ApiProperty({
		example: 'file.jpg',
		description: 'Filename to delete',
		required: true
	})
	@IsString()
	deleteFilename: string

	@ApiProperty({
		example: 'ebooks' || 'books-covers',
		description: 'Folder to upload',
		required: true
	})
	@IsString()
	folder: StorageFolderType
}
