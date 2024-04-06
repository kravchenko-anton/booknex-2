import { createZodDto } from '@anatine/zod-nestjs'
import { extendZodWithOpenApi } from '@anatine/zod-openapi'
import { z } from 'zod'
import { ReviewBookDtoSchema } from '../../../../../libs/global/validation/review/review.book.dto'

extendZodWithOpenApi(z)

export class ReviewBookDto extends createZodDto(ReviewBookDtoSchema) {}
