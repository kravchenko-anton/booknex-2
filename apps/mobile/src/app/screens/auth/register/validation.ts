import { z } from 'zod'

export const registerSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
	name: z
		.string()
		.min(3, 'Name must be at least 3 characters long')
		.max(25, 'Name must be at most 25 characters long')
})
export type RegisterSchemaType = z.infer<typeof registerSchema>
