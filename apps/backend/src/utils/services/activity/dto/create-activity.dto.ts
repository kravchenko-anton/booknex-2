import { createZodDto } from '@anatine/zod-nestjs'
import { extendApi } from '@anatine/zod-openapi'
import { Activities } from '@prisma/client'
import { z } from 'zod'

export const CreateActivityZ = extendApi(
	z.object({
		type: z.nativeEnum(Activities),
		importance: z.number().int().min(1).max(10),
		userId: z.number().positive().optional(),
		bookId: z.number().positive().optional(),
		genreId: z.number().positive().optional()
	}),
	{
		type: {
			description: 'Type of activity',
			example: 'book' || 'genre'
		},
		importance: {
			description: 'Importance of activity',
			example: 5
		},
		userId: {
			description: 'User id',
			example: 1
		},
		bookId: {
			description: 'Book id',
			example: 1
		},
		genreId: {
			description: 'Genre id',
			example: 1
		}
	}
)

export class CreateActivityDto extends createZodDto(CreateActivityZ) {}
