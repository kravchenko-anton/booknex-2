import { z } from 'zod'

export const ImpressionSchema = z.object({
	user: z.object({
		id: z.number(),
		picture: z.string(),
		email: z.string()
	}),
	tags: z.array(z.string()),
	text: z.string().optional().nullable(),
	rating: z.number()
})
