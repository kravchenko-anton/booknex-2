import { createZodDto } from '@anatine/zod-nestjs'
import { extendZodWithOpenApi } from '@anatine/zod-openapi'
import { ImpressionBookSchema } from 'global/validation/impression/impression.book.schema'
import { z } from 'zod'

extendZodWithOpenApi(z)

export class ImpressionDto extends createZodDto(ImpressionBookSchema) {}
