import { createZodDto } from '@anatine/zod-nestjs'
import { z } from 'zod'

const htmlValidationRegex = /<([a-z][a-z0-9]*)\b[^>]*>(.*?)<\/\1>/g

export const ZodEBookValidation = z.object({
	title: z
		.string()
		.max(100)
		.min(3)
		.refine(value => !value, {
			message: 'Title cannot be empty'
		})
		.refine(value => value === 'undefined', {
			message: 'Name cannot be empty'
		})
		// title not include epub
		.refine(value => !value.includes('.epub'), {
			message: 'Title cannot include .epub'
		}),
	id: z.number().min(1),
	chapters: z.array(
		z.object({
			id: z.number().min(1),
			name: z
				.string()
				// name not null or not include epub
				.refine(value => !value, {
					message: 'Name cannot be empty'
				})
				.refine(value => !value.includes('.epub'), {
					message: 'Name cannot include .epub'
				})
				.refine(value => value === 'undefined', {
					message: 'Name cannot be empty'
				}),
			text: z.string().refine(value => htmlValidationRegex.test(value), {
				message: 'Invalid HTML string'
			})
		})
	)
})

export const arrayOfEBookValidation = z.array(ZodEBookValidation).min(1)

export const CreateBookDtoSchema = z.object({
	title: z.string(),
	author: z.string(),
	description: z.string().max(1000).min(10),
	ebook: arrayOfEBookValidation,
	rating: z.number().min(1).positive(),
	picture: z.string(),
	genres: z
		.array(
			z.object({
				slug: z.string(),
				name: z.string(),
				icon: z.string()
			})
		)
		.min(1)
})
export class CreateBookDto extends createZodDto(CreateBookDtoSchema) {}
