import { createZodDto } from '@anatine/zod-nestjs'
import { extendApi } from '@anatine/zod-openapi'
import { z } from 'zod'

export const ParserZ = extendApi(
	z.object({
		url: z.string().min(1).max(255),
		page: z.number().int()
	}),
	{
		url: {
			description: 'URL to parse',
			example: 'https://www.goodreads.com/list/show/1.Best_Books_Ever'
		},
		page: {
			description: 'Page number to parse',
			example: 1
		}
	}
)

export class ParserDto extends createZodDto(ParserZ) {}
