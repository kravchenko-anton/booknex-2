import { z } from 'zod'
import { EBookPayloadSchema } from './ebook.dto'

export const UpdateBookValidation = z.object({
	title: z.string().optional(),
	author: z.string().optional(),
	description: z.string().max(1000).min(10).optional(),
	ebook: z.array(EBookPayloadSchema).min(1).optional(),
	isPublic: z.boolean().optional(),
	rating: z.number().min(1).positive().optional(),
	picture: z.string().optional(),
	genres: z
		.array(
			z.object({
				slug: z.string(),
				name: z.string(),
				icon: z.string()
			})
		)
		.min(1)
		.optional()
})

export type UpdateBookValidationType = z.infer<typeof UpdateBookValidation>
