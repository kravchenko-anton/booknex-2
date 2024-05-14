import { z } from 'zod'

export const ParserSchema = z.object({
	url: z.string().min(1).max(255),
	page: z.number().int().min(0)
})
