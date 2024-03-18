import { z } from 'zod'
import type { CreateBookDto as GeneratedCreateBookDto } from '../../api-client/models/create-book-dto'
import { EBookValidation } from './ebook.dto'

export const CreateBookValidation: z.ZodType<
	Pick<
		GeneratedCreateBookDto,
		'title' | 'author' | 'description' | 'ebook' | 'rating' | 'genres'
	>
> = z.object({
	title: z.string(),
	author: z.string(),
	description: z.string().max(1000).min(10),
	ebook: z.array(EBookValidation).min(1),
	rating: z.number().min(1).positive(),
	picture: z.instanceof(File),
	genres: z.array(z.number()).min(1)
})

export type CreateBookValidationType = Pick<
	GeneratedCreateBookDto,
	'title' | 'author' | 'description' | 'ebook' | 'rating' | 'genres'
> & { picture: File }
