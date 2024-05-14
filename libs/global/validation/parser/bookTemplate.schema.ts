import { z } from 'zod'
import { shortGenreSchema } from '../genre/short-genre.schema'
import { baseCatalogSchema } from '../index'

export const BookTemplateSchema = z.object({
	slug: z.string(),
	title: z.string(),
	author: z.string(),
	description: z.string(),
	picture: z.string(),
	rating: z.number().max(5).min(1),
	genres: z.array(shortGenreSchema)
})

export const BookTemplateCatalogOutputSchema = z
	.object({
		data: z.array(BookTemplateSchema)
	})
	.merge(baseCatalogSchema)
