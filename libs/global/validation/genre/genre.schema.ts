import { z } from 'zod'
import { ShortBookSchema } from '../book/book.schema'
import { shortGenreSchema } from './short-genre.schema'

export const FindOneGenreOutputSchema = z
	.object({
		books: z.array(ShortBookSchema)
	})
	.merge(shortGenreSchema)
