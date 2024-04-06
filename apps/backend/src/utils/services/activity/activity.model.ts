import { createZodDto } from '@anatine/zod-nestjs'
import { extendZodWithOpenApi } from '@anatine/zod-openapi'
import { z } from 'zod'

extendZodWithOpenApi(z)

export const ActivityItemSchema = z.object({
	message: z.string(),
	time: z.string(),
	importance: z.number()
})
export const ActivitySchema = z.object({
	date: z.string(),
	count: z.number(),
	level: z.number(),
	activities: z.array(ActivityItemSchema)
})

export class Activity extends createZodDto(ActivitySchema) {}
