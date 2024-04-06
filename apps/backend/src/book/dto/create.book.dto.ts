import { createZodDto } from '@anatine/zod-nestjs'
import { extendZodWithOpenApi } from '@anatine/zod-openapi'
import { z } from 'zod'
import { CreateBookSchema } from '../../../../../libs/global/validation/book/create.book.dto'

extendZodWithOpenApi(z)

export class CreateBookDto extends createZodDto(CreateBookSchema) {}
