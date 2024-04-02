import {ReviewBookDto} from 'global/api-client';
import {z} from 'zod';

export const ReviewValidation: z.ZodType<ReviewBookDto> = z.object({
  rating: z.number().int().min(1).max(5),
  comment: z.string(),
  tags: z.array(z.string()),
});

export type ReviewValidationType = ReviewBookDto;
