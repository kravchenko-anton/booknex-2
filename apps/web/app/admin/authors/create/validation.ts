import { z } from 'zod'

export const createAuthorValidationSchema = z.object({
	name: z.string(),
	picture: z.object({
		name: z.string(),
		blob: z.custom<Blob>(v => v instanceof Blob)
	}),
	description: z.string()
})

export type CreateAuthorValidationSchemaType = z.infer<
	typeof createAuthorValidationSchema
>
