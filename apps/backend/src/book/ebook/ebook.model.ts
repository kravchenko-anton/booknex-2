import { createZodDto } from '@anatine/zod-nestjs'
import { extendZodWithOpenApi } from '@anatine/zod-openapi'
import { z } from 'zod'
import { ShortBookSchema } from '../book.entity'

extendZodWithOpenApi(z)

const htmlRegex = /<([A-Za-z][\dA-Za-z]*)\b[^>]*>(.*?)<\/\1>/

export const ChapterSchema = z.object({
	id: z.number(),
	name: z.string().refine(value => !value.includes('epub'), {
		message: 'Chapter cannot be an epub'
	}),
	text: z.string().refine(value => htmlRegex.test(value), {
		message: 'Invalid HTML string'
	}),
	romanNumber: z.string(),
	readingTime: z.number()
})

export const PayloadChapterSchema = ChapterSchema.pick({
	id: true,
	name: true,
	text: true
})
export const EBookBaseSchema = z.object({
	id: z.number(),
	title: z.string().refine(value => !value.includes('epub'), {
		message: 'Chapter cannot be an epub'
	})
})

export const StoredEBookSchema = EBookBaseSchema.merge(
	z.object({
		chapters: z.array(ChapterSchema).min(1)
	})
)
export const PayloadEBookSchema = EBookBaseSchema.merge(
	z.object({
		chapters: z.array(PayloadChapterSchema).min(1)
	})
)
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

export class StoredEBook extends createZodDto(StoredEBookSchema) {}
export class PayloadEBook extends createZodDto(PayloadEBookSchema) {}
export class EbookOutput extends createZodDto(EbookOutputSchema) {}
