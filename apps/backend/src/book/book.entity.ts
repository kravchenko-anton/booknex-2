import { createZodDto } from '@anatine/zod-nestjs'
import { extendZodWithOpenApi } from '@anatine/zod-openapi'
import { z } from 'zod'
import { shortGenreSchema } from '../genre/genre.entity'
import { ReviewSchema } from '../review/review.entity'
import {ActivitySchema} from "@/src/activity/activity.model";

extendZodWithOpenApi(z)

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
		genres: z.array(shortGenreSchema)
	})
	.merge(ShortBookSchema)

export const FullBookSchema = BookSchema.merge(
	z
		.object({
			createdAt: z.date(),
			updatedAt: z.date(),
			ebook: z.string(),
			_count: z
				.object({
					finishedBy: z.number(),
					readingBy: z.number(),
					savedBy: z.number()
				})
				.strict(),
			activities: z.array(ActivitySchema),
			review: z.array(ReviewSchema)
		})
		.strict()
)
export class ShortBook extends createZodDto(ShortBookSchema) {}

export class Book extends createZodDto(BookSchema) {}

export class FullBook extends createZodDto(FullBookSchema) {}
