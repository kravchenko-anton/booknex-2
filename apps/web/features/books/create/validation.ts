import { z } from 'zod'

export const createBookValidationSchema = z.object({
	title: z.string(),
	picture: z.object({
		name: z.string(),
		blob: z.instanceof(Blob)
	}),
	pages: z.number().positive(),
	description: z.string(),
	popularity: z.number().positive(),
	author: z.string(),
	books: z
		.array(
			z
				.object({
					name: z.string().refine(value => !value.includes('epub'), {
						message: 'Book name can not include "epub"'
					}),
					content: z
						.array(
							z.object({
								title: z.string(),
								content: z.string()
							})
						)
						.min(1)
				})
				.refine(value => value.name.length > 0, {
					message: 'File is required'
				})
		)
		.min(1),
	genres: z.array(z.number()).min(1)
})

export type CreateBookValidationSchemaType = z.infer<
	typeof createBookValidationSchema
>
