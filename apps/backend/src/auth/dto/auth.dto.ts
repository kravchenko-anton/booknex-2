import { createZodDto } from '@anatine/zod-nestjs'
import { extendZodWithOpenApi } from '@anatine/zod-openapi'
import { Role } from '@prisma/client'
import { z } from 'zod'
import { AuthSchema } from '../../../../../libs/global/validation/auth/auth.dto'

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
export class AuthUserDto extends createZodDto(AuthUserSchema) {}
export class RefreshDto extends createZodDto(RefreshSchema) {}
export class AuthDto extends createZodDto(AuthSchema) {}
