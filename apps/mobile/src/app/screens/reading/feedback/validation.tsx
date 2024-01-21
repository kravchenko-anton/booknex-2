import { z } from 'zod'

export const sendFeedbackSchema = z.object({
	AdditionalComments: z.string().optional(),
	selectedTags: z.array(z.string()).optional()
})
export type SendFeedbackSchemaType = z.infer<typeof sendFeedbackSchema>
