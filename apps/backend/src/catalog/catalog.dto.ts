import { createZodDto } from '@anatine/zod-nestjs'
import { extendZodWithOpenApi } from '@anatine/zod-openapi'
import { FeaturedOutputSchema } from 'global/validation/catalog/catalog.schema'
import { z } from 'zod'

extendZodWithOpenApi(z)

export class FeaturedOutput extends createZodDto(FeaturedOutputSchema) {}
