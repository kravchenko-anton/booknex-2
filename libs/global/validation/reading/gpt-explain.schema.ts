import { z } from 'zod'

export const GptExplainSchema = z.object({
	selectedText: z.string(),
	context: z.string(),
	bookTitle: z.string()
})

export type GptExplainSchemaType = z.infer<typeof GptExplainSchema>
