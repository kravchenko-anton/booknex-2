import { z } from 'zod'
import { EBookTypeDto } from './ebook.dto'

export const CreateBookDto = z.object({
	title: z.string(),
	author: z.string(),
	description: z.string(),
	ebook: z.array(EBookTypeDto).min(1),
	pages: z.number().min(1).int().positive(),
	popularity: z.number().min(1).int().positive(),
	picture: z.unknown(),
	genres: z.array(z.number()).min(1)
})

export type CreateBookDtoType = Omit<
	z.infer<typeof CreateBookDto>,
	'picture'
> & {
	picture: File
}
