import { z } from 'zod'

export const baseCatalogSchema = z.object({
	canLoadMore: z.boolean(),
	totalPages: z.number()
})
