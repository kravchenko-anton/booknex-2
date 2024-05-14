import { createZodDto } from '@anatine/zod-nestjs'
import { extendZodWithOpenApi } from '@anatine/zod-openapi'
import {
	BookTemplateCatalogOutputSchema,
	BookTemplateSchema
} from 'global/validation/parser/bookTemplate.schema'
import { ParserDtoSchema } from 'global/validation/parser/parser.schema'
import { UnfoldOutputSchema } from 'global/validation/parser/unfold.schema'
import { z } from 'zod'

extendZodWithOpenApi(z)

export class BookTemplate extends createZodDto(BookTemplateSchema) {}
export class ParserDto extends createZodDto(ParserDtoSchema) {}
export class UnfoldOutput extends createZodDto(UnfoldOutputSchema) {}
export class BookTemplateCatalogOutput extends createZodDto(
	BookTemplateCatalogOutputSchema
) {}
