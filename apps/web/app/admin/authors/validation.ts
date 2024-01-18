import { z } from 'zod'

export const ManipulationAuthorValidationSchema = z.object({
	name: z.string(),
	picture: z.object({
		name: z.string(),
		blob: z.custom<Blob>(v => v instanceof Blob)
	}),
	description: z.string()
})

export type ManipulationAuthorValidationSchemaType = z.infer<
	typeof ManipulationAuthorValidationSchema
>
