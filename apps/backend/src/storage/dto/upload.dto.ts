import { createZodDto } from '@anatine/zod-nestjs'
import { extendZodWithOpenApi } from '@anatine/zod-openapi'
import { z } from 'zod'

extendZodWithOpenApi(z)

export const UploadOutputDtoSchema = z.object({
	name: z.string()
})

export class UploadOutputDto extends createZodDto(UploadOutputDtoSchema) {}
