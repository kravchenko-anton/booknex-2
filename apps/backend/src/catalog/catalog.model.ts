import { createZodDto } from '@anatine/zod-nestjs'
import { extendZodWithOpenApi } from '@anatine/zod-openapi'
import { z } from 'zod'
import { ShortBookSchema } from '../book/book.entity'
import { shortGenreSchema } from '../genre/genre.entity'

extendZodWithOpenApi(z)

export const FeaturedOutputSchema = z.object({
	interestedGenres: z.array(shortGenreSchema),
	recommendation: z.array(ShortBookSchema),
	popularBooks: z.array(ShortBookSchema),
	bestSellingBooks: z.array(ShortBookSchema),
	newReleases: z.array(ShortBookSchema)
})

export class FeaturedOutput extends createZodDto(FeaturedOutputSchema) {}
