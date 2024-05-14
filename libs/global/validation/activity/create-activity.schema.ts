import { Activities } from '@prisma/client'
import { z } from 'zod'

export const CreateActivitySchema = z.object({
	type: z.nativeEnum(Activities),
	importance: z.number().int().min(1).max(10),
	userId: z.number().int().positive().optional(),
	bookSlug: z.string().optional(),
	genreSlug: z.string().optional()
})
