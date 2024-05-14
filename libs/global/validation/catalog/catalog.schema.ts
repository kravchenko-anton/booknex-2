import { z } from 'zod'
import { ShortBookSchema } from '../book/book.schema'
import { ShortGenreSchema } from '../genre/short-genre.schema'

export const FeaturedOutputSchema = z.object({
	//  picksOfWeek: ShortBook[];   interestedGenres: {    id: number;    name: string;   }[];   bestSellingBooks: ShortBook[];   newReleases: ShortBook[];   booksBySelectedGenres: { ...; }[][];
	picksOfWeek: z.array(ShortBookSchema),
	genres: z.array(ShortGenreSchema),
	bestSellingBooks: z.array(ShortBookSchema),
	newReleases: z.array(ShortBookSchema),
	booksBySelectedGenres: z.array(z.array(ShortBookSchema))
})
