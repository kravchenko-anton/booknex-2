import { z } from 'zod'
import { ShortBookSchema } from '../book/book.schema'
import {
	ChapterPayloadSchema,
	ChapterSchema,
	OutputChapterSchema
} from './chapter.schema'

export const EBookBaseSchema = z.object({
	id: z.number().min(1),
	title: z
		.string()
		.max(100)
		.min(3)
		.refine(value => value !== 'undefined', {
			message: 'Name cannot be empty'
		})
		.refine(value => !value.includes('.epub'), {
			message: 'Title cannot include .epub'
		})
})
export const EbookOutputSchema = z
	.object({
		file: z.array(z.string()),
		chapters: z.array(OutputChapterSchema)
	})
	.merge(ShortBookSchema.pick({ title: true, picture: true }))
export const StoredEBookSchema = z
	.object({
		chapters: z.array(ChapterSchema).min(1)
	})
	.merge(EBookBaseSchema)
export const EbookSchema = z
	.object({
		chapters: z.array(ChapterPayloadSchema).min(1)
	})
	.merge(EBookBaseSchema)

export type EBookPayloadType = z.infer<typeof EbookSchema>
