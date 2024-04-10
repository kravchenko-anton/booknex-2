import { createZodDto } from '@anatine/zod-nestjs'
import { extendZodWithOpenApi } from '@anatine/zod-openapi'
import { z } from 'zod'

extendZodWithOpenApi(z)

export const shortGenreSchema = z.object({
	slug: z.string(),
	name: z.string(),
	icon: z.string()
})

export class ShortGenre extends createZodDto(shortGenreSchema) {}
