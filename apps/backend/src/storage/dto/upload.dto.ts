import { createZodDto } from '@anatine/zod-nestjs'
import { extendApi } from '@anatine/zod-openapi'
import { z } from 'zod'

export const FilenameZ = extendApi(
	z.object({
		filename: z.string().min(1).max(255)
	}),
	{
		filename: {
			description: 'Filename',
			example: 'file.jpg'
		}
	}
)

export const ReplacementZ = extendApi(
	z.object({
		deleteFilename: z.string().min(1).max(255),
		folder: z.enum(['ebooks', 'booksCovers'])
	}),
	{
		deleteFilename: {
			description: 'Filename to delete',
			example: 'file.jpg'
		},
		folder: {
			description: 'Folder to upload',
			example: 'ebooks' || 'books-covers'
		}
	}
)

export const UploadOutputZ = extendApi(
	z.object({
		name: z.string().min(1).max(255)
	}),
	{
		name: {
			description: 'Filename',
			example: 'file.jpg'
		}
	}
)

export class ReplacementDto extends createZodDto(ReplacementZ) {}
export class FilenameDto extends createZodDto(FilenameZ) {}
export class UploadOutputDto extends createZodDto(UploadOutputZ) {}
