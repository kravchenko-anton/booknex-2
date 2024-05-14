import { z } from 'zod'

export const UnfoldOutputSchema = z.object({
	id: z.number(),
	name: z.string(),
	text: z.string()
})
