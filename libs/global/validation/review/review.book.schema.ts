import { z } from 'zod'

export const ReviewBookDtoSchema = z.object({
	rating: z.number().int().min(1).max(5),
	tags: z.array(z.string()).optional(),
	comment: z.string().optional()
})

export type ReviewBookDtoType = z.infer<typeof ReviewBookDtoSchema>
