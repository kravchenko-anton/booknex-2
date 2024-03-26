import { z } from 'zod';
import type { UpdateBookDto as GeneratedUpdateBookDto } from '../../api-client/models/update-book-dto';
import { arrayOfEBookValidation } from './ebook.dto';

export const UpdateBookValidation: z.ZodType<GeneratedUpdateBookDto> = z.object({
  title: z.string().optional(),
  author: z.string().optional(),
  description: z.string().max(1000).min(10).optional(),
  ebook: arrayOfEBookValidation.optional(),
  rating: z.number().min(1).positive().optional(),
  picture: z.string().optional(),
  genres: z.array(z.number()).min(1).optional()
});

export type UpdateBookValidationType = GeneratedUpdateBookDto;
