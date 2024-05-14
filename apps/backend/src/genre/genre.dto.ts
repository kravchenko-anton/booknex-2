import { createZodDto } from '@anatine/zod-nestjs'
import { extendZodWithOpenApi } from '@anatine/zod-openapi'
import { FindOneGenreOutputSchema } from 'global/validation/genre/genre.schema'
import { ShortGenreSchema } from 'global/validation/genre/short-genre.schema'
import { z } from 'zod'

extendZodWithOpenApi(z)

export class FindOneGenreOutput extends createZodDto(
	FindOneGenreOutputSchema
) {}

export class ShortGenre extends createZodDto(ShortGenreSchema) {}
