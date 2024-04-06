import { createZodDto } from '@anatine/zod-nestjs'
import { extendZodWithOpenApi } from '@anatine/zod-openapi'
import { z } from 'zod'
import { AuthUserSchema } from './dto/auth.dto'

extendZodWithOpenApi(z)

export const AuthOutputSchema = z.object({
	accessToken: z.string(),
	refreshToken: z.string(),
	type: z.string().optional(),
	user: AuthUserSchema
})

export class AuthOutput extends createZodDto(AuthOutputSchema) {}
