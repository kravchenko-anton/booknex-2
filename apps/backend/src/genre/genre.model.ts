import { createZodDto } from '@anatine/zod-nestjs'
import { extendApi } from '@anatine/zod-openapi'
import { z } from 'zod'
import { shortBookZ } from '../book/book.model'

export const shortGenreZ = extendApi(
	z.object({
		id: z.number().int(),
		name: z.string()
	}),
	{
		id: { example: 1, description: 'genre id' },
		name: { example: 'name', description: 'genre name' }
	}
)

export const GenreZ = extendApi(
	z.object({
		id: z.number().int(),
		createdAt: z.coerce.date(),
		updatedAt: z.coerce.date(),
		name: z.string(),
		description: z.string()
	}),
	{
		id: { example: 1, description: 'genre id' },
		createdAt: {
			example: '2021-08-17T12:00:00.000Z',
			description: 'genre created at'
		},
		updatedAt: {
			example: '2021-08-17T12:00:00.000Z',
			description: 'genre updated at'
		},
		name: { example: 'name', description: 'genre name' },
		description: { example: 'description', description: 'genre description' }
	}
)

export const byIdZ = extendApi(
	z
		.object({
			majorBooks: shortBookZ.array()
		})
		.merge(shortGenreZ),
	{
		majorBooks: {
			example: [
				{ id: 1, title: 'title', picture: 'picture', author: 'author' }
			],
			description: 'books'
		}
	}
)

export class byIdOutput extends createZodDto(byIdZ) {}
export class shortGenre extends createZodDto(shortGenreZ) {}
export class Genre extends createZodDto(GenreZ) {}
