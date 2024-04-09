import { z } from 'zod'
import { EBookPayloadSchema } from './ebook.payload.dto'

export const shortGenreSchema = z.object({
	slug: z.string(),
	name: z.string(),
	icon: z.string()
})
export const CreateBookSchema = z.object({
	title: z.string(),
	author: z.string(),
	description: z.string().max(1000).min(10),
	ebook: z.array(EBookPayloadSchema).min(1),
	rating: z.number().min(1).positive(),
	picture: z.string(),

	genres: z.array(shortGenreSchema).min(1)
})

export type CreateBookSchemaType = z.infer<typeof CreateBookSchema>
