import { CreateBookDto } from 'global/api-client'
import { z } from 'zod'
import { arrayOfEBookValidation } from './ebook.dto'

export const CreateBookValidation: z.ZodType<CreateBookDto> = z.object({
	title: z.string(),
	author: z.string(),
	description: z.string().max(1000).min(10),
	ebook: arrayOfEBookValidation,
	rating: z.number().min(1).positive(),
	picture: z.string(),
	genres: z.array(z.string()).min(1)
})

export type CreateBookValidationType = CreateBookDto
