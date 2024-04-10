import { extendZodWithOpenApi } from '@anatine/zod-openapi'
import { z } from 'zod'

extendZodWithOpenApi(z)

export const ActivityItemSchema = z.object({
	message: z.string(),
	time: z.string(),
	importance: z.number().min(1).max(10)
})
export const ActivitySchema = z.object({
	date: z.string(),
	count: z.number().min(1),
	level: z.number().min(1).max(10),
	activities: z.array(ActivityItemSchema)
})
