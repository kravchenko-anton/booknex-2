import { createZodDto } from '@anatine/zod-nestjs'
import { extendZodWithOpenApi } from '@anatine/zod-openapi'
import { UpdateBookSchema } from 'global/validation/book/update.book.dto'
import { z } from 'zod'

extendZodWithOpenApi(z)

export class UpdateBookDto extends createZodDto(UpdateBookSchema) {}
