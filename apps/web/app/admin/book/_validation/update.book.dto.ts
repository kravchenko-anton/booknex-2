import { UpdateBookDto } from 'global/api-client'
import { z } from 'zod'
import { arrayOfEBookValidation } from './ebook.dto'

export const UpdateBookValidation: z.ZodType<UpdateBookDto> = z.object({
	title: z.string().optional(),
	author: z.string().optional(),
	description: z.string().max(1000).min(10).optional(),
	ebook: arrayOfEBookValidation.optional(),
	rating: z.number().min(1).positive().optional(),
	picture: z.string().optional(),
	genres: z.array(z.number()).min(1).optional()
})

export type UpdateBookValidationType = UpdateBookDto
