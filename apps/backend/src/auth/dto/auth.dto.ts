import { createZodDto } from '@anatine/zod-nestjs'
import { extendApi } from '@anatine/zod-openapi'
import { z } from 'zod'

export const SignZ = extendApi(
	z.object({
		socialId: z.string()
	}),
	{
		socialId: {
			description: 'Social id',
			required: true
		}
	}
)

export const RefreshZ = extendApi(
	z.object({
		refreshToken: z.string()
	}),
	{
		refreshToken: {
			description: 'Refresh token',
			required: true
		}
	}
)

export const AuthZ = extendApi(
	z.object({
		email: z.string().email(),
		password: z.string().min(8)
	}),
	{
		email: {
			description: "User's email",
			required: true
		},
		password: {
			description: "User's password",
			required: true
		}
	}
)

export const AuthResponseZ = extendApi(
	z.object({
		accessToken: z.string(),
		refreshToken: z.string(),
		type: z.string(),
		user: z
			.object({
				id: z.number().positive(),
				email: z.string(),
				role: z.enum(['admin', 'user'])
			})

			.required()
	}),
	{
		accessToken: {
			description: 'Access token',
			required: true
		},
		refreshToken: {
			description: 'Refresh token',
			required: true
		},
		type: {
			description: 'Token type',
			required: true
		},
		user: {
			description: 'User info',
			required: true
		}
	}
)

export class AuthResponseDto extends createZodDto(AuthResponseZ) {}
export class AuthDto extends createZodDto(AuthZ) {}
export class RefreshDto extends createZodDto(RefreshZ) {}
export class SignDto extends createZodDto(SignZ) {}
