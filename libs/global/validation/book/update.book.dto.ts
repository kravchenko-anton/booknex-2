import { z } from 'zod'
import { EBookPayloadSchema } from './ebook.payload.dto'

export const shortGenreSchema = z.object({
	slug: z.string(),
	name: z.string(),
	icon: z.string()
})
export const UpdateBookSchema = z.object({
	title: z.string().optional(),
	author: z.string().optional(),
	description: z.string().max(1000).min(10).optional(),
	ebook: z.array(EBookPayloadSchema).min(1).optional(),
	isPublic: z.boolean().optional(),
	rating: z.number().min(1).positive().optional(),
	picture: z.string().optional(),
	genres: z.array(shortGenreSchema).min(1).optional()
})

export type UpdateBookSchemaType = z.infer<typeof UpdateBookSchema>
