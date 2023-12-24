import { z } from 'zod'

export const updateBookValidationSchema = z.object({
	title: z.string(),
	picture: z
		.object({
			name: z.string(),
			blob: z.instanceof(Blob)
		})
		.optional(),
	pages: z.string(),
	description: z.string(),
	popularity: z.string(),
	author: z.object({
		label: z.string(),
		value: z.number()
	}),
	html: z.string(),
	charapters: z.array(
		z.object({
			name: z.string().refine(value => !value.includes('epub'), {
				message: 'Book name can not include "epub"'
			}),
			children: z.array(
				z.object({
					name: z.string(),
					link: z.string()
				})
			)
		})
	),

	genres: z.array(
		z.object({
			label: z.string(),
			value: z.number()
		})
	)
})

export type UpdateBookValidationSchemaType = z.infer<
	typeof updateBookValidationSchema
>
