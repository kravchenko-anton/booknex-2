import { z } from 'zod';
import type { CreateBookDto as GeneratedCreateBookDto } from '../../api-client/models/create-book-dto';
import { arrayOfEBookValidation } from './ebook.dto';

export const CreateBookValidation: z.ZodType<
  Pick<GeneratedCreateBookDto, 'title' | 'author' | 'description' | 'ebook' | 'rating' | 'genres'>
> = z.object({
  title: z.string(),
  author: z.string(),
  description: z.string().max(1000).min(10),
  ebook: arrayOfEBookValidation,
  rating: z.number().min(1).positive(),
  picture: z.string(),
  genres: z.array(z.number()).min(1)
});

export type CreateBookValidationType = GeneratedCreateBookDto;
