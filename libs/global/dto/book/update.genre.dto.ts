import { z } from 'zod'

export const UpdateGenreDto = z.object({
	genres: z.array(z.number())
})

export type UpdateGenreDtoType = z.infer<typeof UpdateGenreDto>
