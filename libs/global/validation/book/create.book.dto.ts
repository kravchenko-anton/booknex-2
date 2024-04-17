import { z } from 'zod'
import { shortGenreValidationSchema } from '../genre/short-genre'
import { EBookPayloadSchema } from './ebook.payload.dto'

export const CreateBookSchema = z.object({
	title: z.string(),
	author: z.string(),
	description: z.string().max(1000).min(10),
	ebook: z.array(EBookPayloadSchema).min(1),
	rating: z.number().min(1).positive(),
	picture: z.string(),

	genres: z.array(shortGenreValidationSchema).min(1)
})

export type CreateBookSchemaType = z.infer<typeof CreateBookSchema>
