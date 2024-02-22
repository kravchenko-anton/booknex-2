import { createZodDto } from '@anatine/zod-nestjs'
import { extendApi } from '@anatine/zod-openapi'
import { z } from 'zod'
import { reviewTags } from '../review-tags'

export const ReviewBookZ = extendApi(
	z.object({
		rating: z.number().int().min(1).max(5),
		tags: z.array(z.string()).optional(),
		comment: z.string().optional()
	}),
	{
		rating: {
			description: 'Rating of the book',
			example: 5
		},
		tags: {
			description: 'Tags for the book',
			example: reviewTags.positive.map(tag => tag.name)
		},
		comment: {
			description: 'Comment for the book',
			example: 'Good book with a lot of useful information'
		}
	}
)
export class ReviewBookDto extends createZodDto(ReviewBookZ) {}
