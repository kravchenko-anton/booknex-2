import { ParserDto } from 'global/api-client'
import { z } from 'zod'

export const callParserValidation: z.ZodType<ParserDto> = z.object({
	url: z.string(),
	page: z.number().int()
})

export type CallParserValidationType = ParserDto
