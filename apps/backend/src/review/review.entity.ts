import { extendZodWithOpenApi } from '@anatine/zod-openapi'

import { z } from 'zod'

extendZodWithOpenApi(z)

export const ReviewSchema = z.object({
	user: z.object({
		id: z.number(),
		picture: z.string(),
		email: z.string()
	}),
	tags: z.array(z.string()),
	text: z.string().optional().nullable(),
	rating: z.number()
})
