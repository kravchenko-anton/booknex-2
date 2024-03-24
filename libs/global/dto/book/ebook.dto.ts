import { z } from 'zod';
import type { PayloadEBook as GeneratedPayloadEBook } from '../../api-client';

const htmlRegex = /<([A-Za-z][\dA-Za-z]*)\b[^>]*>(.*?)<\/\1>/;

export const EBookValidation: z.ZodType<GeneratedPayloadEBook> = z.object({
  title: z.string(),
  id: z.number().min(1),
  chapters: z.array(
    z.object({
      id: z.number().min(1),
      name: z.string(),
      text: z.string().refine((value) => htmlRegex.test(value), {
        message: 'Invalid HTML string'
      })
    })
  )
});

export const arrayOfEBookValidation = z.array(EBookValidation).min(1);
