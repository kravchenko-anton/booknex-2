import { createZodDto } from '@anatine/zod-nestjs'
import { extendZodWithOpenApi } from '@anatine/zod-openapi'
import { Activities } from '@prisma/client'
import { z } from 'zod'

extendZodWithOpenApi(z)

export const CreateActivityDtoSchema = z.object({
	type: z.nativeEnum(Activities),
	importance: z.number().int().min(1).max(10),
	userId: z.number().int().positive().optional(),
	bookSlug: z.string().optional(),
	genreSlug: z.string().optional()
})

export class CreateActivityDto extends createZodDto(CreateActivityDtoSchema) {}
