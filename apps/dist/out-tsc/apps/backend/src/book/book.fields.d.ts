import { Prisma } from '@prisma/client';
export declare const infoBySlug: {
    title: boolean;
    isPublic: boolean;
    slug: boolean;
    chapters: boolean;
    picture: boolean;
    author: boolean;
    description: boolean;
    mainGenre: boolean;
    readingTime: boolean;
    rating: boolean;
    genres: {
        select: Pick<Prisma.GenreSelect<import("@prisma/client/runtime/library").DefaultArgs>, "slug" | "name" | "icon" | "emoji">;
    };
};
export declare const infoBySlugAdminFields: (slug: string) => Prisma.BookSelect;
export declare const bookCatalogFields: ({ page, perPage, searchTerm }: {
    page: number;
    perPage: number;
    searchTerm: string;
}) => {
    readonly where?: {
        title: {
            contains: string;
        };
        id?: undefined;
    } | {
        id: string;
        title?: undefined;
    } | undefined;
    readonly skip?: number | undefined;
    readonly take: number;
    readonly select: {
        author: true;
        chapters: true;
        title: true;
        picture: true;
        slug: true;
        genres: {
            select: Pick<Prisma.GenreSelect<import("@prisma/client/runtime/library").DefaultArgs>, "slug" | "name" | "icon" | "emoji">;
        };
        readingTime: true;
        rating: true;
        isPublic: true;
        description: true;
        mainGenre: {
            select: Pick<Prisma.GenreSelect<import("@prisma/client/runtime/library").DefaultArgs>, "slug" | "name" | "icon" | "emoji">;
        };
    };
    readonly orderBy: {
        readonly isPublic: "asc";
    };
};
export declare const bookCreateFields: ({ dto, genreIds, mainGenreSlug, ebookName, readingTime, chaptersCount, pagesCount }: {
    dto: {
        title: string;
        picture: string;
        rating: number;
        description: string;
        author: string;
    };
    genreIds: {
        slug: string;
    }[];
    mainGenreSlug: string;
    ebookName: string;
    readingTime: number;
    chaptersCount: number;
    pagesCount: number;
}) => {
    pagesCount: number;
    slug: string;
    chapters: number;
    title: string;
    picture: string;
    rating: number;
    readingTime: number;
    description: string;
    ebook: string;
    author: string;
    genres: {
        connect: {
            slug: string;
        }[];
    };
    mainGenre: {
        connect: {
            slug: string;
        };
    };
};
