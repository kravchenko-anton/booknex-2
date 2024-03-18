import { z } from 'zod'
import type { UpdateBookDto } from '../../api-client'

export const UpdateBookBioValidation: z.ZodType<
	Pick<UpdateBookDto, 'title' | 'author' | 'description' | 'rating'>
> = z.object({
	title: z.string().optional(),
	author: z.string().optional(),
	description: z.string().optional(),
	rating: z.number().optional()
})

export type UpdateBookBioValidationType = Pick<
	UpdateBookDto,
	'title' | 'author' | 'description' | 'rating'
>
