import { z } from 'zod'

export const createAuthorValidationSchema = z.object({
	name: z.string().nonempty(),
	picture: z.object({
		name: z.string().nonempty(),
		blob: z.custom<Blob>(v => v instanceof Blob)
	}),
	description: z.string().nonempty()
})

export type CreateAuthorValidationSchemaType = z.infer<
	typeof createAuthorValidationSchema
>
