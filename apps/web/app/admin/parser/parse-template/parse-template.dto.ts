import type { ParserDto } from 'global/api-client'
import { z } from 'zod'

export const parseValidation: z.ZodType<ParserDto> = z.object({
	url: z.string(),
	page: z.number().int()
})

export type parseValidationType = ParserDto
