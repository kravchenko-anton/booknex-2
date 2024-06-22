import { z } from 'zod'

export const UnfoldOutputSchema = z.object({
	id: z.string(),
	name: z.string(),
	text: z.string()
})
