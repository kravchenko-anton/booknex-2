import { createZodDto } from '@anatine/zod-nestjs'
import { extendZodWithOpenApi } from '@anatine/zod-openapi'
import { z } from 'zod'

extendZodWithOpenApi(z)

export const shortGenreSchema = z.object({
	slug: z.string(),
	name: z.string(),
	icon: z.string()
})

export const genreSchema = shortGenreSchema.merge(
	z.object({
		createdAt: z.string(),
		updatedAt: z.string(),
		description: z.string()
	})
)

export class ShortGenre extends createZodDto(shortGenreSchema) {}
export class Genre extends createZodDto(genreSchema) {}
