import { z } from 'zod'
import type { PayloadEBook as GeneratedPayloadEBook } from '../../api-client'

export const EBookValidation: z.ZodType<GeneratedPayloadEBook> = z.object({
	title: z.string(),
	id: z.number().min(1),
	chapters: z.array(
		z.object({
			id: z.number().min(1),
			name: z.string(),
			text: z.string()
		})
	)
})
