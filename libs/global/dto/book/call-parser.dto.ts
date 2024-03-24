import { z } from 'zod';
import type { ParserDto as GeneratedParserType } from '../../api-client';

export const callParserValidation: z.ZodType<GeneratedParserType> = z.object({
  url: z.string(),
  page: z.number().int()
});

export type CallParserValidationType = GeneratedParserType;
