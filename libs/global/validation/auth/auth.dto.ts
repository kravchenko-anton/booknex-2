import { extendZodWithOpenApi } from '@anatine/zod-openapi'
import { z } from 'zod'

extendZodWithOpenApi(z)

export const AuthSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8)
})

export type AuthDtoType = z.infer<typeof AuthSchema>
