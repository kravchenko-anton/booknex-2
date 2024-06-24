import { Prisma } from '@prisma/client';
export const parserCatalogFields = ({ page, perPage, searchTerm }) => ({
    take: perPage,
    select: Prisma.validator()({
        title: true,
        slug: true,
        rating: true,
        description: true,
        author: true,
        genres: true,
        picture: true
    }),
    ...(page && {
        skip: page * perPage
    }),
    ...(searchTerm && {
        where: {
            OR: [
                {
                    author: {
                        contains: searchTerm,
                        mode: 'insensitive'
                    }
                },
                {
                    title: {
                        contains: searchTerm,
                        mode: 'insensitive'
                    }
                }
            ]
        },
        ...(searchTerm && {
            where: {
                id: searchTerm
            }
        })
    })
});
export const bookTemplateByIdFields = (slug) => ({
    where: {
        slug
    },
    select: Prisma.validator()({
        title: true,
        slug: true,
        rating: true,
        description: true,
        author: true,
        picture: true,
        genres: true
    })
});
//# sourceMappingURL=parser.fields.js.map