import { createZodDto } from '@anatine/zod-nestjs'
import { extendApi } from '@anatine/zod-openapi'
import { z } from 'zod'

export const UserUpdateSelectedGenresZ = extendApi(
	z.object({
		selectedGenres: z.array(z.number().min(1).positive())
	}),
	{
		selectedGenres: {
			description: 'Array of selected genres',
			example: [1, 2, 3]
		}
	}
)

export class UserUpdateSelectedGenresDto extends createZodDto(
	UserUpdateSelectedGenresZ
) {}
