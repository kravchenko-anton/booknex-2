import { z } from 'zod'

export const UpdatePasswordSchema = z.object({
	oldPassword: z.string().min(8, 'Password must be at least 8 characters long'),
	password: z.string().min(8, 'Password must be at least 8 characters long')
})
export type UpdatePasswordSchemaType = z.infer<typeof UpdatePasswordSchema>
