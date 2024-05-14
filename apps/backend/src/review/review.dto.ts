import { createZodDto } from '@anatine/zod-nestjs'
import { extendZodWithOpenApi } from '@anatine/zod-openapi'
import { ReviewBookDtoSchema } from 'global/validation/review/review.book.schema'
import { z } from 'zod'

extendZodWithOpenApi(z)

export class ReviewDto extends createZodDto(ReviewBookDtoSchema) {}
