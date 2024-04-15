import { z } from 'zod'

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

export const ChapterPayloadSchema = z.object({
	id: z.number().min(1),
	name: z
		.string()
		.refine(value => !value.includes('.epub'), {
			message: 'Name cannot include .epub'
		})
		.refine(value => value !== 'undefined', {
			message: 'Name cannot be empty'
		}),
	text: z.string().refine(
		value => {
			const regex = /<([A-Za-z][\dA-Za-z]*)\b[^>]*>(.*?)<\/\1>/
			return regex.test(value)
		},
		{
			message: 'Text should be in HTML format'
		}
	)
})

export const EBookPayloadSchema = z
	.object({
		chapters: z.array(ChapterPayloadSchema).min(1)
	})
	.merge(EBookBaseSchema)

export type EBookPayloadType = z.infer<typeof EBookPayloadSchema>
