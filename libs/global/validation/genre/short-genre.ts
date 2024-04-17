import { z } from 'zod'

export const shortGenreValidationSchema = z.object({
	slug: z.string(),
	name: z.string(),
	icon: z.string()
})
