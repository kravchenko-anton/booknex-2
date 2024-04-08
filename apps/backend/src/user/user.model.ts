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
	readingBooks: z.array(ShortBookSchema),
	finishedBooks: z.array(ShortBookSchema),
	savedBooks: z.array(ShortBookSchema)
})
export class UserCatalogOutput extends createZodDto(UserCatalogOutputSchema) {}

export class UserLibraryOutput extends createZodDto(UserLibraryOutputSchema) {}
