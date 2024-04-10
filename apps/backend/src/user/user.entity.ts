import { createZodDto } from '@anatine/zod-nestjs'
import { extendZodWithOpenApi } from '@anatine/zod-openapi'
import { z } from 'zod'

extendZodWithOpenApi(z)

export const UserSchema = z.object({
	id: z.number(),
	createdAt: z.date(),
	email: z.string().email(),
	socialId: z.string().nullable().optional(),
	picture: z.string(),
	fullName: z.string(),
	location: z.string()
})
export class User extends createZodDto(UserSchema) {}
