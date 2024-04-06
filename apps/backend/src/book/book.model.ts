import { createZodDto } from '@anatine/zod-nestjs'
import { extendZodWithOpenApi } from '@anatine/zod-openapi'
import { z } from 'zod'
import { baseCatalogModel } from '../utils/common/base-catalog.model'
import { BookSchema } from './book.entity'

extendZodWithOpenApi(z)
export const CatalogOutputSchema = z
	.object({
		data: z.array(BookSchema)
	})
	.merge(baseCatalogModel)

export class CatalogOutput extends createZodDto(CatalogOutputSchema) {}
