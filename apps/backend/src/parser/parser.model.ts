import { createZodDto } from '@anatine/zod-nestjs'
import { extendApi } from '@anatine/zod-openapi'
import { z } from 'zod'

export const BookTemplateZ = extendApi(
	z.object({
		id: z.number().int(),
		createdAt: z.coerce.date(),
		updatedAt: z.coerce.date(),
		title: z.string(),
		author: z.string(),
		description: z.string(),
		picture: z.string(),
		pages: z.number().int(),
		popularity: z.number().int()
	}),
	{
		id: { example: 1, description: 'book id' },
		createdAt: {
			example: '2021-09-10T12:00:00Z',
			description: 'book creation date'
		},
		updatedAt: {
			example: '2021-09-10T12:00:00Z',
			description: 'book update date'
		},
		title: { example: 'title', description: 'book title' },
		author: { example: 'author', description: 'book author' },
		description: { example: 'description', description: 'book description' },
		picture: { example: 'picture', description: 'book picture' },
		pages: { example: 100, description: 'book pages' },
		popularity: { example: 100, description: 'book popularity' }
	}
)

export const unfoldZ = extendApi(
	z.object({
		id: z.number().int(),
		name: z.string(),
		text: z.string()
	}),
	{
		id: { example: 1, description: 'chapter id' },
		name: { example: 'name', description: 'chapter name' },
		text: { example: 'text', description: 'chapter text' }
	}
)

export const BookTemplateCatalogZ = extendApi(
	z.object({
		data: z.object({}).merge(BookTemplateZ).array(),
		canLoadMore: z.boolean(),
		totalPages: z.number().int()
	})
)

export type ChaptersOutput = z.infer<typeof unfoldZ>
export class BookTemplate extends createZodDto(BookTemplateZ) {}
export class BookTemplateCatalogOutput extends createZodDto(
	BookTemplateCatalogZ
) {}
export class unfoldOutput extends createZodDto(unfoldZ) {}
