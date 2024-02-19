import { ebookValidation } from '@/features/books/ebook-validation'
import { z } from 'zod'

export const createBookValidationSchema = z.object({
	title: z.string(),
	picture: z.object({
		name: z.string(),
		blob: z.instanceof(Blob)
	}),
	pages: z.coerce.number().positive(),
	description: z.string(),
	popularity: z.coerce.number().positive(),
	author: z.string(),
	books: ebookValidation,
	genres: z.array(z.number()).min(1)
})

export type CreateBookValidationSchemaType = z.infer<
	typeof createBookValidationSchema
>
