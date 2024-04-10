import { createZodDto } from '@anatine/zod-nestjs'
import { extendZodWithOpenApi } from '@anatine/zod-openapi'
import { Role } from '@prisma/client'
import { AuthSchema } from 'global/validation/auth/auth.dto'
import { z } from 'zod'

extendZodWithOpenApi(z)

export const GoogleAuthSchema = z.object({
	socialId: z.string()
})

export const AuthUserSchema = z.object({
	email: z.string().email(),
	role: z.nativeEnum(Role)
})

export const RefreshSchema = z.object({
	refreshToken: z.string()
})

export class GoogleAuthDto extends createZodDto(GoogleAuthSchema) {}
export class RefreshDto extends createZodDto(RefreshSchema) {}
export class AuthDto extends createZodDto(AuthSchema) {}
