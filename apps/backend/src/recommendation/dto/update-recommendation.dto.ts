import { createZodDto } from '@anatine/zod-nestjs'
import { extendZodWithOpenApi } from '@anatine/zod-openapi'
import { z } from 'zod'

extendZodWithOpenApi(z)

export const UpdateRecommendationDtoSchema = z.object({
	genreSlugs: z.array(z.string()).min(1)
})

export class UpdateRecommendationDto extends createZodDto(
	UpdateRecommendationDtoSchema
) {}
