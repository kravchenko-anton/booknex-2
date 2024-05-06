import { ActivitySchema } from '@/src/activity/activity.model'
import { createZodDto } from '@anatine/zod-nestjs'
import { extendZodWithOpenApi } from '@anatine/zod-openapi'
import { z } from 'zod'
import { ShortBookSchema } from '../book/book.entity'
import { shortGenreSchema } from '../genre/genre.entity'
import { baseCatalogModel } from '../utils/common/base-catalog.model'
import { UserSchema } from './user.entity'

extendZodWithOpenApi(z)

export const CatalogUserOutputSchema = z
	.object({
		id: z.number(),
		email: z.string(),
		selectedGenres: z.array(shortGenreSchema),
		activities: z.array(ActivitySchema),
		_count: z
			.object({
				savedBooks: z.number(),
				finishedBooks: z.number(),
				readingBooks: z.number()
			})
			.strict()
	})
	.merge(UserSchema)

export const UserCatalogOutputSchema = z
	.object({
		data: z.array(CatalogUserOutputSchema)
	})
	.merge(baseCatalogModel)

export const UserLibraryOutputSchema = z.object({
	readingBooks: z.array(
		ShortBookSchema.merge(
			z.object({
				readingHistory: z.object({
					progress: z.number(),
					scrollPosition: z.number()
				})
			})
		)
	),
	finishedBooks: z.array(ShortBookSchema),
	savedBooks: z.array(ShortBookSchema)
})

export const HistorySchema = z.object({
	startDate: z.date(),
	endDate: z.date(),
	progress: z.number(),
	readingTimeMs: z.number(),
	scrollPosition: z.number(),
	bookSlug: z.string()
})

export const UserStatisticsSchema = z.object({
	progressByCurrentWeek: z.array(
		z.object({
			day: z.string(),
			isReadMoreThatGoal: z.boolean(),
			readingTimeMs: z.number()
		})
	),
	pepTalk: z.string(),
	userSteak: z.number(),
	isDaySteakComplete: z.boolean()
})
export class ReadingHistory extends createZodDto(HistorySchema) {}
export class UserStatistics extends createZodDto(UserStatisticsSchema) {}
export class UserCatalogOutput extends createZodDto(UserCatalogOutputSchema) {}

export class UserLibraryOutput extends createZodDto(UserLibraryOutputSchema) {}
