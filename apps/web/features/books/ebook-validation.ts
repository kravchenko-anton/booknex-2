import { z } from 'zod'

export const ebookValidation = z
	.array(
		z
			.object({
				title: z.string().refine(value => !value.includes('epub'), {
					message: 'Book name can not include "epub"'
				}),
				chapters: z
					.array(
						z.object({
							id: z.number().positive(),
							name: z.string(),
							text: z.string()
						})
					)
					.min(1)
			})
			.refine(value => value.title.length > 0, {
				message: 'File is required'
			})
	)
	.min(1)
