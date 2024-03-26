import { PayloadEBook } from 'global/api-client'
import { z } from 'zod'

const htmlRegex = /<([A-Za-z][\dA-Za-z]*)\b[^>]*>(.*?)<\/\1>/

export const EBookValidation: z.ZodType<PayloadEBook> = z.object({
	title: z.string(),
	id: z.number().min(1),
	chapters: z.array(
		z.object({
			id: z.number().min(1),
			name: z.string(),
			text: z.string().refine(value => htmlRegex.test(value), {
				message: 'Invalid HTML string'
			})
		})
	)
})

export const arrayOfEBookValidation = z.array(EBookValidation).min(1)
