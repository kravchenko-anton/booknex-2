import { createZodDto } from '@anatine/zod-nestjs'
import { extendZodWithOpenApi } from '@anatine/zod-openapi'
import { z } from 'zod'
import { ShortBookSchema } from '../book/book.entity'
import { shortGenreSchema } from '../genre/genre.entity'

extendZodWithOpenApi(z)

export const FeaturedOutputSchema = z.object({
	//  picksOfWeek: ShortBook[];   interestedGenres: {    id: number;    name: string;   }[];   bestSellingBooks: ShortBook[];   newReleases: ShortBook[];   booksBySelectedGenres: { ...; }[][];
	picksOfWeek: z.array(ShortBookSchema),
	interestedGenres: z.array(shortGenreSchema),
	bestSellingBooks: z.array(ShortBookSchema),
	newReleases: z.array(ShortBookSchema),
	booksBySelectedGenres: z.array(z.array(ShortBookSchema))
})

export class FeaturedOutput extends createZodDto(FeaturedOutputSchema) {}
