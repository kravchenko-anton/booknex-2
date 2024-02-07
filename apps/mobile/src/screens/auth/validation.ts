import { z } from 'zod'

export const authValidationSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8)
})
export type AuthValidationSchemaType = z.infer<typeof authValidationSchema>
