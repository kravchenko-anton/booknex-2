import { createZodDto } from '@anatine/zod-nestjs'
import { extendApi } from '@anatine/zod-openapi'
import { z } from 'zod'

export const shortBookZ = extendApi(
	z.object({
		id: z.number().int(),
		title: z.string(),
		picture: z.string(),
		author: z.string()
	}),
	{
		id: { example: 1, description: 'book id' },
		title: { example: 'title', description: 'book title' },
		picture: { example: 'picture', description: 'book picture' },
		author: { example: 'author', description: 'book author' }
	}
)

export const adminCatalogZ = extendApi(
	z.object({
		data: z
			.object({
				description: z.string(),
				pages: z.number().int(),
				popularity: z.number().int(),
				visible: z.boolean(),
				genres: z
					.object({
						id: z.number().int(),
						name: z.string()
					})
					.array(),
				majorGenre: z.object({
					id: z.number().int(),
					name: z.string()
				})
			})
			.merge(shortBookZ)
			.array(),
		canLoadMore: z.boolean(),
		totalPages: z.number().int()
	})
)
export const genreZ = extendApi(
	z.object({
		genres: z
			.object({
				id: z.number().int(),
				name: z.string()
			})
			.array()
	}),
	{
		genres: { example: [{ id: 1, name: 'genre' }], description: 'book genres' }
	}
)

export const BookZ = extendApi(
	z
		.object({
			description: z.string(),
			picture: z.string(),
			ebook: z.string(),
			pages: z.number().int(),
			popularity: z.number().int(),
			visible: z.boolean()
		})
		.merge(shortBookZ)
		.merge(genreZ),
	{
		description: { example: 'description', description: 'book description' },
		picture: { example: 'picture', description: 'book picture' },
		ebook: { example: 'ebook', description: 'book ebook' },
		pages: { example: 100, description: 'book pages' },
		popularity: { example: 100, description: 'book popularity' },
		visible: { example: true, description: 'book visibility' }
	}
)

export const infoByIdZ = extendApi(
	z.object({}).merge(shortBookZ).merge(genreZ),
	{}
)

export const adminInfoByIdZ = extendApi(
	z
		.object({
			visible: z.boolean(),
			ebook: z.string(),
			description: z.string(),
			popularity: z.number().int(),
			pages: z.number().int(),
			_count: z.object({
				finishedBy: z.number().int(),
				readingBy: z.number().int(),
				savedBy: z.number().int()
			}),
			review: z
				.object({
					id: z.number().int(),
					tags: z.string().array(),
					text: z.string(),
					rating: z.number().int(),
					user: z.object({
						id: z.number().int(),
						email: z.string()
					})
				})
				.array()
		})
		.merge(shortBookZ)
		.merge(genreZ),
	{
		visible: { example: true, description: 'book visibility' },
		ebook: { example: 'ebook', description: 'book ebook' },
		description: { example: 'description', description: 'book description' },
		popularity: { example: 100, description: 'book popularity' },
		pages: { example: 100, description: 'book pages' },
		_count: {
			example: { finishedBy: 1, readingBy: 1, savedBy: 1 },
			description: 'book count'
		},
		review: {
			example: [
				{
					id: 1,
					tags: 'tags',
					text: 'text',
					rating: 1,
					user: { id: 1, email: 'email' }
				}
			],
			description: 'book review'
		}
	}
)

export const ebookByIdOutput = extendApi(
	z
		.object({
			file: z.string().array(),
			chapters: z
				.object({
					title: z.string(),
					children: z
						.object({
							name: z.string(),
							link: z.string()
						})
						.array()
				})
				.array()
		})
		.merge(shortBookZ),
	{
		file: { example: ['file'], description: 'book file' },
		chapters: {
			example: [
				{
					title: 'title',
					children: [{ name: 'name', link: 'link' }]
				}
			],
			description: 'book chapters'
		}
	}
)
export class Book extends createZodDto(BookZ) {}
export class ShortBook extends createZodDto(shortBookZ) {}
export class AdminCatalogOutput extends createZodDto(adminCatalogZ) {}
export class EbookByIdOutput extends createZodDto(ebookByIdOutput) {}
export class InfoByIdOutput extends createZodDto(infoByIdZ) {}
export class AdminInfoByIdOutput extends createZodDto(adminInfoByIdZ) {}
