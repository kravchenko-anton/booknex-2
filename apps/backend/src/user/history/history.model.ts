import { createZodDto } from '@anatine/zod-nestjs'
import { extendZodWithOpenApi } from '@anatine/zod-openapi'
import { z } from 'zod'

extendZodWithOpenApi(z)

export const HistorySchema = z.object({
	startDate: z.date(),
	endDate: z.date(),
	readingTimeMs: z.number(),
	scrollPosition: z.number(),
	bookSlug: z.string()
})

export class History extends createZodDto(HistorySchema) {}
