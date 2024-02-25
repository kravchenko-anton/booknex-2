import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsString, MaxLength, MinLength } from 'class-validator'
import { StorageFolderEnum, StorageFolderType } from '../storage.types'

export class FilenameDto {
	@IsString()
	@MinLength(1)
	@MaxLength(255)
	@ApiProperty({ type: 'string' })
	filename: string
}

export class ReplacementDto {
	@IsString()
	@MinLength(1)
	@ApiProperty({ type: 'string' })
	@MaxLength(255)
	deleteFilename: string

	@IsEnum(StorageFolderEnum)
	folder: StorageFolderType
}

export class UploadOutputDto {
	@ApiProperty({ type: 'string' })
	@IsString()
	name: string
}
