import { createZodDto } from '@anatine/zod-nestjs'
import { extendApi } from '@anatine/zod-openapi'
import { z } from 'zod'
import { shortBookZ } from '../book/book.model'
import { shortGenreZ } from '../genre/genre.model'

export const RoleSchema = z.enum(['user', 'admin'])

export const UserZ = extendApi(
	z.object({
		role: RoleSchema,
		id: z.number().int(),
		createdAt: z.coerce.date(),
		updatedAt: z.coerce.date(),
		email: z.string(),
		socialId: z.string().nullable(),
		password: z.string().nullable(),
		picture: z.string(),
		fullName: z.string(),
		location: z.string()
	}),
	{
		role: { example: 'user', description: 'user role' },
		id: { example: 1, description: 'user id' },
		createdAt: {
			example: '2021-09-10T12:00:00Z',
			description: 'user creation date'
		},
		updatedAt: {
			example: '2021-09-10T12:00:00Z',
			description: 'user update date'
		},
		email: { example: 'email', description: 'user email' },
		socialId: { example: 'socialId', description: 'user socialId' },
		password: { example: 'password', description: 'user password' },
		picture: { example: 'picture', description: 'user picture' },
		fullName: { example: 'fullName', description: 'user fullName' },
		location: { example: 'location', description: 'user location' }
	}
)

export const userLibraryZ = extendApi(
	z.object({
		readingBooks: z.object({}).merge(shortBookZ).array(),
		finishedBooks: z.object({}).merge(shortBookZ).array(),
		savedBooks: z.object({}).merge(shortBookZ).array()
	}),
	{
		readingBooks: {
			description: 'user reading books'
		},
		finishedBooks: {
			description: 'user finished books'
		},
		savedBooks: {
			description: 'user saved books'
		}
	}
)
export const userProfileZ = extendApi(
	z.object({
		id: z.number().int(),
		email: z.string(),
		bookCount: z.number().int(),
		totalPageCount: z.number().int()
	}),
	{
		id: { example: 1, description: 'user id' },
		email: { example: 'email', description: 'user email' }
	}
)

export const UserAdminCatalogZ = extendApi(
	z.object({
		data: z
			.object({
				_count: z.object({
					savedBooks: z.number().int(),
					review: z.number().int(),
					finishedBooks: z.number().int(),
					readingBooks: z.number().int()
				}),
				//TODO: сделать тут activityType
				selectedGenres: z.object({}).merge(shortGenreZ).array()
			})
			.merge(UserZ)
			.array(),
		canLoadMore: z.boolean(),
		totalPages: z.number().int()
	})
)

export class UserLibrary extends createZodDto(userLibraryZ) {}
export class UserProfile extends createZodDto(userProfileZ) {}
export class UserAdminCatalog extends createZodDto(UserAdminCatalogZ) {}
export class User extends createZodDto(UserZ) {}
