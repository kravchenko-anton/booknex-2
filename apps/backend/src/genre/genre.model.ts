import { createZodDto } from '@anatine/zod-nestjs'
import { extendZodWithOpenApi } from '@anatine/zod-openapi'
import { z } from 'zod'
import { ShortBookSchema } from '../book/book.entity'
import { shortGenreSchema } from './genre.entity'

extendZodWithOpenApi(z)

export const FindOneGenreOutputSchema = z
	.object({
		books: z.array(ShortBookSchema)
	})
	.merge(shortGenreSchema)

export class FindOneGenreOutput extends createZodDto(
	FindOneGenreOutputSchema
) {}
