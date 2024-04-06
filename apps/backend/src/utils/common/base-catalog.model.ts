import { extendZodWithOpenApi } from '@anatine/zod-openapi'
import { z } from 'zod'

extendZodWithOpenApi(z)

export const baseCatalogModel = z.object({
	canLoadMore: z.boolean(),
	totalPages: z.number()
})
