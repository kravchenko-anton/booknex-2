import { z } from 'zod';
import type { UpdateGenreDto } from '../../api-client';

export const UpdateGenreValidation: z.ZodType<UpdateGenreDto> = z.object({
  genres: z.array(z.number())
});

export type UpdateGenreValidationType = UpdateGenreDto;
