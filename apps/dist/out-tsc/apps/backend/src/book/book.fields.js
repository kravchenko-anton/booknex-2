import { ReturnGenreObject } from '@/src/genre/return.genre.object';
import { Prisma } from '@prisma/client';
import { slugify } from 'global/helpers/slugify';
export const infoBySlug = {
    title: true,
    isPublic: true,
    slug: true,
    chapters: true,
    picture: true,
    author: true,
    description: true,
    mainGenre: false,
    readingTime: true,
    rating: true,
    genres: { select: ReturnGenreObject }
};
export const infoBySlugAdminFields = (slug) => Prisma.validator()({
    id: true,
    chapters: true,
    title: true,
    picture: true,
    recommendable: true,
    author: true,
    slug: true,
    createdAt: true,
    updatedAt: true,
    rating: true,
    pagesCount: true,
    readingTime: true,
    genres: {
        select: ReturnGenreObject
    },
    ebook: true,
    description: true,
    isPublic: true,
    _count: {
        select: {
            finishedBy: true,
            readingBy: true,
            savedBy: true
        }
    },
    readingHistory: {
        where: {
            bookSlug: slug
        },
        orderBy: {
            endDate: 'asc'
        },
        select: {
            endDate: true,
            progressDelta: true,
            readingTimeMs: true,
            scrollPosition: true,
            startDate: true
        }
    }
});
export const bookCatalogFields = ({ page, perPage, searchTerm }) => ({
    take: perPage,
    select: Prisma.validator()({
        author: true,
        chapters: true,
        title: true,
        picture: true,
        slug: true,
        genres: { select: ReturnGenreObject },
        readingTime: true,
        rating: true,
        isPublic: true,
        description: true,
        mainGenre: {
            select: ReturnGenreObject
        }
    }),
    orderBy: {
        isPublic: 'asc'
    },
    ...(page && {
        skip: page * perPage
    }),
    ...(searchTerm && {
        where: {
            title: {
                contains: searchTerm
            }
        },
        ...(searchTerm && {
            where: {
                id: searchTerm
            }
        })
    })
});
export const bookCreateFields = ({ dto, genreIds, mainGenreSlug, ebookName, readingTime, chaptersCount, pagesCount }) => Prisma.validator()({
    pagesCount: pagesCount,
    slug: slugify(dto.title),
    chapters: chaptersCount,
    title: dto.title,
    picture: dto.picture,
    rating: dto.rating,
    readingTime: readingTime,
    description: dto.description,
    ebook: ebookName,
    author: dto.author,
    genres: {
        connect: genreIds
    },
    mainGenre: {
        connect: {
            slug: mainGenreSlug
        }
    }
});
//# sourceMappingURL=book.fields.js.map