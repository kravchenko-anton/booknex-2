import type { Prisma } from '@prisma/client';
import { defaultReturnObject } from '../utils/common/return.default.object';

export const ReturnGenreObject: Pick<
  Prisma.GenreSelect,
  'name' | keyof typeof defaultReturnObject
> = {
  ...defaultReturnObject,
  name: true
};
