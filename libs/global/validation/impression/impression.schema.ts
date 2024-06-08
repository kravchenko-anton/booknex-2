import { z } from 'zod'

export const ImpressionSchema = z.object({
	tags: z.array(z.string()),
	text: z.string().optional().nullable(),
	rating: z.number()
})
