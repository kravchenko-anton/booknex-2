import { z } from 'zod'

export const ReviewSchema = z.object({
	id: z.number().int(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
	rating: z.number().int(),
	tags: z.string().array(),
	text: z.string(),
	bookId: z.number().int(),
	userId: z.number().int()
})
