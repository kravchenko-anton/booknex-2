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
	author: z.object({
		label: z.string(),
		value: z.number()
	}),
	chapters: z
		.array(
			z.object({
				name: z.string(),
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
		.nonempty(),
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
						.nonempty()
				})
				.refine(value => value.name.length > 0, {
					message: 'File is required'
				})
		)
		.nonempty(),
	genres: z
		.array(
			z.object({
				label: z.string(),
				value: z.number()
			})
		)
		.nonempty()
})

export type CreateBookValidationSchemaType = z.infer<
	typeof createBookValidationSchema
>
