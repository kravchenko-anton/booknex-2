import { z } from 'zod'

export const updateBookValidationSchema = z.object({
	title: z.string().optional(),
	picture: z
		.object({
			name: z.string(),
			blob: z.instanceof(Blob)
		})
		.optional(),
	pages: z.number().positive().optional(),
	description: z.string().optional(),
	popularity: z.number().positive().optional(),
	author: z
		.object({
			label: z.string(),
			value: z.number()
		})
		.optional(),
	file: z.string().optional(),
	charapters: z
		.array(
			z.object({
				name: z.string().refine(value => !value.includes('epub'), {
					message: 'Book name can not include "epub"'
				}),
				children: z
					.array(
						z.object({
							name: z.string(),
							link: z.string()
						})
					)
					.nonempty()
			})
		)
		.optional(),

	genres: z
		.array(
			z.object({
				label: z.string(),
				value: z.number()
			})
		)
		.optional()
})

export type UpdateBookValidationSchemaType = z.infer<
	typeof updateBookValidationSchema
>
