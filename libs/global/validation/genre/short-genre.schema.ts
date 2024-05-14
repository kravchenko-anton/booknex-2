import { z } from 'zod'

export const ShortGenreSchema = z.object({
	slug: z.string(),
	name: z.string(),
	icon: z.string()
})
