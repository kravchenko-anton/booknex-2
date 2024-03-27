import { z } from 'zod'

export const AuthDto = z.object({
	email: z.string().email(),
	password: z.string().min(8)
})

export type AuthDtoType = z.infer<typeof AuthDto>
