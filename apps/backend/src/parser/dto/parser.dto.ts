import { createZodDto } from '@anatine/zod-nestjs'
import { extendZodWithOpenApi } from '@anatine/zod-openapi'
import { z } from 'zod'

extendZodWithOpenApi(z)

export const ParserDtoSchema = z.object({
	url: z.string().min(1).max(255),
	page: z.number().int().min(0)
})

export class ParserDto extends createZodDto(ParserDtoSchema) {}
