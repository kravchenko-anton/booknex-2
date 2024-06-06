import { z } from 'zod'

export const CreateReactionSchema = z.object({
	bookSlug: z.string(),
	type: z.string(),
	description: z.string().optional(),
	text: z.string(),
	xpath: z.string(),
	startOffset: z.number(),
	endOffset: z.number()
})

export type CreateReactionSchemaType = z.infer<typeof CreateReactionSchema>
