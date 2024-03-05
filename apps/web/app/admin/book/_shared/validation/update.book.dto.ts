import { z } from 'zod'

export const UpdateBookDto = z.object({
	picture: z.string().optional(),
	title: z.string().optional(),
	author: z.string().optional(),
	description: z.string().optional(),
	pages: z.number().optional(),
	visible: z.boolean().optional(),
	popularity: z.number().optional()
})

export type UpdateBookDtoType = z.infer<typeof UpdateBookDto>
