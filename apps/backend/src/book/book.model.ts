import { baseCatalogModel } from '@/src/utils/common/base-catalog.model'
import { createZodDto } from '@anatine/zod-nestjs'
import { extendZodWithOpenApi } from '@anatine/zod-openapi'
import { z } from 'zod'
import { BookSchema, ShortBookSchema } from './book.entity'

extendZodWithOpenApi(z)

export const CatalogOutputSchema = z
	.object({
		data: z.array(BookSchema)
	})
	.merge(baseCatalogModel)

export const infoBySlugSchema = BookSchema.merge(
	z.object({
		fromSameAuthor: z.array(ShortBookSchema)
	})
)

export class CatalogOutput extends createZodDto(CatalogOutputSchema) {}
export class InfoBySlug extends createZodDto(infoBySlugSchema) {}
