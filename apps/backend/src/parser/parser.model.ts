import { createZodDto } from '@anatine/zod-nestjs'
import { extendZodWithOpenApi } from '@anatine/zod-openapi'
import { z } from 'zod'
import { baseCatalogModel } from '../utils/common/base-catalog.model'
import { BookTemplateSchema } from './parser.entity'

extendZodWithOpenApi(z)

export const UnfoldOutputSchema = z.object({
	id: z.number(),
	name: z.string(),
	text: z.string()
})

export const BookTemplateCatalogOutputSchema = z
	.object({
		data: z.array(BookTemplateSchema)
	})
	.merge(baseCatalogModel)

export class UnfoldOutput extends createZodDto(UnfoldOutputSchema) {}
export class BookTemplateCatalogOutput extends createZodDto(
	BookTemplateCatalogOutputSchema
) {}
