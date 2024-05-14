import { z } from 'zod'

export const shortGenreSchema = z.object({
	slug: z.string(),
	name: z.string(),
	icon: z.string()
})
