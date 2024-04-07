import { createZodDto } from '@anatine/zod-nestjs'
import { extendZodWithOpenApi } from '@anatine/zod-openapi'
import { CreateBookSchema } from 'global/validation/book/create.book.dto'
import { z } from 'zod'

extendZodWithOpenApi(z)

export class CreateBookDto extends createZodDto(CreateBookSchema) {}
