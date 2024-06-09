import { z } from 'zod'

export const UpdateReactionSchema = z
	.object({
		id: z.number(),
		type: z.string().optional(),
		description: z.string().optional(),
		text: z.string().optional(),
		xpath: z.string().optional(),
		startOffset: z.number().optional(),
		endOffset: z.number().optional()
	})
	.partial()
export type UpdateReactionSchemaType = z.infer<typeof UpdateReactionSchema>
