import { createZodDto } from '@anatine/zod-nestjs'
import { extendZodWithOpenApi } from '@anatine/zod-openapi'
import {
	ChapterPayloadSchema,
	EBookBaseSchema
} from 'global/validation/book/ebook.payload.dto'
import { z } from 'zod'
import { ShortBookSchema } from '../book.entity'

extendZodWithOpenApi(z)

export const ChapterSchema = z
	.object({
		romanNumber: z.string(),
		readingTime: z.number()
	})
	.merge(ChapterPayloadSchema)

export const StoredEBookSchema = z
	.object({
		chapters: z.array(ChapterSchema).min(1)
	})
	.merge(EBookBaseSchema)

export const OutputChapterChildSchema = z.object({
	name: z.string(),
	link: z.string()
})
export const OutputChapterSchema = z.object({
	title: z.string(),
	children: z.array(OutputChapterChildSchema)
})
export const EbookOutputSchema = z
	.object({
		file: z.array(z.string()),
		chapters: z.array(OutputChapterSchema)
	})
	.merge(ShortBookSchema.pick({ title: true, picture: true }))

export class ChapterType extends createZodDto(ChapterSchema) {}
export class StoredEBook extends createZodDto(StoredEBookSchema) {}
export class BaseChapter extends createZodDto(ChapterPayloadSchema) {}
export class EbookOutput extends createZodDto(EbookOutputSchema) {}
