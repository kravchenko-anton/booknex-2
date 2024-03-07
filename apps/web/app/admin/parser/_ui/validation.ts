import { z } from 'zod'

export const callParserDto = z.object({
	link: z.string(),
	page: z.number().int().positive()
})

export type CallParserDtoType = z.infer<typeof callParserDto>
