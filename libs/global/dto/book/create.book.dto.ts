import { z } from 'zod'
import { EBookTypeDto } from './ebook.dto'

export const CreateBookDto = z.object({
	title: z.string(),
	author: z.string(),
	description: z.string().max(1000).min(10),
	ebook: z.array(EBookTypeDto).min(1),
	rating: z.number().min(1).positive(),
	picture: z.unknown(),
	genres: z.array(z.number()).min(1)
})

export type CreateBookDtoType = Omit<
	z.infer<typeof CreateBookDto>,
	'picture'
> & {
	picture: File
}
