import { createZodDto } from '@anatine/zod-nestjs'
import { extendApi } from '@anatine/zod-openapi'
import { z } from 'zod'
import { shortBookZ } from '../book/book.model'

export const featuredZ = extendApi(
	z.object({
		relatedGenres: z
			.object({
				id: z.number().int(),
				name: z.string()
			})
			.array(),
		recommendations: z.object({}).merge(shortBookZ).array(),
		popularBooks: z.object({}).merge(shortBookZ).array(),
		bestSellingBooks: z.object({}).merge(shortBookZ).array(),
		newReleases: z.object({}).merge(shortBookZ).array()
	}),
	{}
)

export class featuredOutput extends createZodDto(featuredZ) {}
