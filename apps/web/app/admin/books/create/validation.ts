import { z } from 'zod'

export const createBookValidationSchema = z.object({
	title: z
		.string()
		.refine(value => value && value.length > 0, 'Title is required'),
	picture: z.object({
		name: z.string().nonempty(),
		blob: z.custom<Blob>(v => v instanceof Blob)
	}),
	pages: z.number().refine(value => value > 0, {
		message: 'At least one page is required'
	}),
	description: z.string().refine(value => value && value.length > 0, {
		message: 'Description is required'
	}),
	popularity: z.number().refine(value => value > 0, {
		message: 'At least one view is required'
	}),
	author: z.object({
		label: z.string(),
		value: z.number()
	}),
	books: z.array(
		z
			.object({
				name: z.string(),
				content: z.array(
					z.object({
						title: z.string(),
						content: z.string()
					})
				)
			})
			.refine(value => value.name.length > 0, {
				message: 'File is required'
			})
	),
	genres: z.array(
		z.object({
			label: z.string(),
			value: z.number()
		})
	)
})

export type CreateBookValidationSchemaType = z.infer<
	typeof createBookValidationSchema
>
