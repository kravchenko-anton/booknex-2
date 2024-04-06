import { createZodDto } from '@anatine/zod-nestjs'
import { extendZodWithOpenApi } from '@anatine/zod-openapi'

import { z } from 'zod'

extendZodWithOpenApi(z)

export const ReviewSchema = z.object({
	id: z.number(),
	tags: z.array(z.string()),
	text: z.string().optional().nullable(),
	rating: z.number()
})

export class Review extends createZodDto(ReviewSchema) {}
