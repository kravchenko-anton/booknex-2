import { z } from 'zod'
import { ShortGenreSchema } from '../genre/short-genre.schema'
import { ImpressionSchema } from '../impression/impression.schema'
import { BaseCatalogSchema } from '../index'

export const ShortBookSchema = z.object({
	slug: z.string(),
	title: z.string(),
	picture: z.string(),
	author: z.string()
})
export const BookSchema = z
	.object({
		description: z.string(),
		readingTime: z.number(),
		chapters: z.number(),
		rating: z.number(),
		isPublic: z.boolean(),
		genres: z.array(ShortGenreSchema)
	})
	.merge(ShortBookSchema)

export const FullBookSchema = BookSchema.merge(
	z
		.object({
			createdAt: z.date(),
			updatedAt: z.date(),
			recommendable: z.boolean(),
			ebook: z.string(),
			_count: z
				.object({
					finishedBy: z.number(),
					readingBy: z.number(),
					savedBy: z.number()
				})
				.strict(),
			statistics: z.array(
				z.object({
					endDate: z.date(),
					progressDelta: z.number(),
					pagesRead: z.number(),
					readingTimeMs: z.number()
				})
			),
			impressions: z.array(ImpressionSchema)
		})
		.strict()
)

export const CatalogOutputSchema = z
	.object({
		data: z.array(BookSchema)
	})
	.merge(BaseCatalogSchema)

export const infoBySlugSchema = BookSchema.merge(
	z.object({
		fromSameAuthor: z.array(ShortBookSchema)
	})
)
