/* eslint-disable unicorn/prefer-spread */
import { Prisma } from '@prisma/client';
export const catalogSearchFields = (query) => Prisma.validator()({
    isPublic: true,
    OR: Array.from([
        {
            title: {
                mode: 'insensitive',
                contains: query
            }
        },
        {
            author: {
                contains: query,
                mode: 'insensitive'
            }
        }
    ])
});
//# sourceMappingURL=catalog.fields.js.map