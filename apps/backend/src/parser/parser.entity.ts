import { createZodDto } from '@anatine/zod-nestjs'
import { extendZodWithOpenApi } from '@anatine/zod-openapi'
import { z } from 'zod'
import { shortGenreSchema } from '../genre/genre.entity'

extendZodWithOpenApi(z)

export const BookTemplateSchema = z.object({
	slug: z.string(),
	title: z.string(),
	author: z.string(),
	description: z.string(),
	picture: z.string(),
	rating: z.number(),
	genres: z.array(shortGenreSchema)
})
export class BookTemplate extends createZodDto(BookTemplateSchema) {}
