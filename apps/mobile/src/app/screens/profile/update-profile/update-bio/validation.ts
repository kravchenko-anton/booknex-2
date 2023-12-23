import { z } from 'zod'

export const UpdateBioSchema = z.object({
	name: z
		.string()
		.min(3, 'Name must be at least 3 characters long')
		.max(25, 'Name must be at most 25 characters long'),
	email: z.string().email('Invalid email address')
})
export type UpdateBioSchemaType = z.infer<typeof UpdateBioSchema>
