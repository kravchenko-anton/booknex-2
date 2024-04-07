import { createZodDto } from '@anatine/zod-nestjs'
import { extendZodWithOpenApi } from '@anatine/zod-openapi'
import { z } from 'zod'
import { UpdateBookSchema } from '../../../../../libs/global/validation/book/update.book.dto'

extendZodWithOpenApi(z)

export class UpdateBookDto extends createZodDto(UpdateBookSchema) {}
