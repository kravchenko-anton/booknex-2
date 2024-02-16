import { z } from 'zod'

export const sendReviewSchema = z.object({
	AdditionalComments: z.string().optional(),
	selectedTags: z.array(z.string()).optional()
})
export type SendReviewSchemaType = z.infer<typeof sendReviewSchema>
