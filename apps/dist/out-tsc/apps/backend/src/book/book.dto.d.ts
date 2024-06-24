import { z } from 'zod';
declare const CreateBookDto_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<{
    title: z.ZodString;
    author: z.ZodString;
    description: z.ZodString;
    ebook: z.ZodArray<z.ZodObject<z.objectUtil.extendShape<{
        chapters: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, string, string>;
            text: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id: string;
            name: string;
            text: string;
        }, {
            id: string;
            name: string;
            text: string;
        }>, "many">;
    }, {
        id: z.ZodString;
        title: z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, string, string>;
    }>, "strip", z.ZodTypeAny, {
        id: string;
        title: string;
        chapters: {
            id: string;
            name: string;
            text: string;
        }[];
    }, {
        id: string;
        title: string;
        chapters: {
            id: string;
            name: string;
            text: string;
        }[];
    }>, "many">;
    rating: z.ZodNumber;
    picture: z.ZodString;
    genres: z.ZodArray<z.ZodObject<{
        slug: z.ZodString;
        name: z.ZodString;
        icon: z.ZodString;
        emoji: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        slug: string;
        name: string;
        icon: string;
        emoji: string;
    }, {
        slug: string;
        name: string;
        icon: string;
        emoji: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    picture: string;
    title: string;
    author: string;
    genres: {
        slug: string;
        name: string;
        icon: string;
        emoji: string;
    }[];
    description: string;
    ebook: {
        id: string;
        title: string;
        chapters: {
            id: string;
            name: string;
            text: string;
        }[];
    }[];
    rating: number;
}, {
    picture: string;
    title: string;
    author: string;
    genres: {
        slug: string;
        name: string;
        icon: string;
        emoji: string;
    }[];
    description: string;
    ebook: {
        id: string;
        title: string;
        chapters: {
            id: string;
            name: string;
            text: string;
        }[];
    }[];
    rating: number;
}>>;
export declare class CreateBookDto extends CreateBookDto_base {
}
declare const ShortBook_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<{
    slug: z.ZodString;
    title: z.ZodString;
    picture: z.ZodString;
    author: z.ZodString;
}, "strip", z.ZodTypeAny, {
    picture: string;
    slug: string;
    title: string;
    author: string;
}, {
    picture: string;
    slug: string;
    title: string;
    author: string;
}>>;
export declare class ShortBook extends ShortBook_base {
}
declare const UpdateBookDto_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    author: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    ebook: z.ZodOptional<z.ZodArray<z.ZodObject<z.objectUtil.extendShape<{
        chapters: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, string, string>;
            text: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id: string;
            name: string;
            text: string;
        }, {
            id: string;
            name: string;
            text: string;
        }>, "many">;
    }, {
        id: z.ZodString;
        title: z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, string, string>;
    }>, "strip", z.ZodTypeAny, {
        id: string;
        title: string;
        chapters: {
            id: string;
            name: string;
            text: string;
        }[];
    }, {
        id: string;
        title: string;
        chapters: {
            id: string;
            name: string;
            text: string;
        }[];
    }>, "many">>;
    isPublic: z.ZodOptional<z.ZodBoolean>;
    recommendable: z.ZodOptional<z.ZodBoolean>;
    rating: z.ZodOptional<z.ZodNumber>;
    picture: z.ZodOptional<z.ZodString>;
    genres: z.ZodOptional<z.ZodArray<z.ZodObject<{
        slug: z.ZodString;
        name: z.ZodString;
        icon: z.ZodString;
        emoji: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        slug: string;
        name: string;
        icon: string;
        emoji: string;
    }, {
        slug: string;
        name: string;
        icon: string;
        emoji: string;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    picture?: string | undefined;
    title?: string | undefined;
    author?: string | undefined;
    genres?: {
        slug: string;
        name: string;
        icon: string;
        emoji: string;
    }[] | undefined;
    description?: string | undefined;
    recommendable?: boolean | undefined;
    ebook?: {
        id: string;
        title: string;
        chapters: {
            id: string;
            name: string;
            text: string;
        }[];
    }[] | undefined;
    rating?: number | undefined;
    isPublic?: boolean | undefined;
}, {
    picture?: string | undefined;
    title?: string | undefined;
    author?: string | undefined;
    genres?: {
        slug: string;
        name: string;
        icon: string;
        emoji: string;
    }[] | undefined;
    description?: string | undefined;
    recommendable?: boolean | undefined;
    ebook?: {
        id: string;
        title: string;
        chapters: {
            id: string;
            name: string;
            text: string;
        }[];
    }[] | undefined;
    rating?: number | undefined;
    isPublic?: boolean | undefined;
}>>;
export declare class UpdateBookDto extends UpdateBookDto_base {
}
declare const Book_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<z.objectUtil.extendShape<{
    description: z.ZodString;
    readingTime: z.ZodNumber;
    chapters: z.ZodNumber;
    rating: z.ZodNumber;
    isPublic: z.ZodBoolean;
    genres: z.ZodArray<z.ZodObject<{
        slug: z.ZodString;
        name: z.ZodString;
        icon: z.ZodString;
        emoji: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        slug: string;
        name: string;
        icon: string;
        emoji: string;
    }, {
        slug: string;
        name: string;
        icon: string;
        emoji: string;
    }>, "many">;
}, {
    slug: z.ZodString;
    title: z.ZodString;
    picture: z.ZodString;
    author: z.ZodString;
}>, "strip", z.ZodTypeAny, {
    picture: string;
    slug: string;
    title: string;
    author: string;
    genres: {
        slug: string;
        name: string;
        icon: string;
        emoji: string;
    }[];
    description: string;
    readingTime: number;
    chapters: number;
    rating: number;
    isPublic: boolean;
}, {
    picture: string;
    slug: string;
    title: string;
    author: string;
    genres: {
        slug: string;
        name: string;
        icon: string;
        emoji: string;
    }[];
    description: string;
    readingTime: number;
    chapters: number;
    rating: number;
    isPublic: boolean;
}>>;
export declare class Book extends Book_base {
}
declare const FullBook_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<z.objectUtil.extendShape<z.objectUtil.extendShape<{
    description: z.ZodString;
    readingTime: z.ZodNumber;
    chapters: z.ZodNumber;
    rating: z.ZodNumber;
    isPublic: z.ZodBoolean;
    genres: z.ZodArray<z.ZodObject<{
        slug: z.ZodString;
        name: z.ZodString;
        icon: z.ZodString;
        emoji: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        slug: string;
        name: string;
        icon: string;
        emoji: string;
    }, {
        slug: string;
        name: string;
        icon: string;
        emoji: string;
    }>, "many">;
}, {
    slug: z.ZodString;
    title: z.ZodString;
    picture: z.ZodString;
    author: z.ZodString;
}>, {
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    recommendable: z.ZodBoolean;
    ebook: z.ZodString;
    _count: z.ZodObject<{
        finishedBy: z.ZodNumber;
        readingBy: z.ZodNumber;
        savedBy: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        finishedBy: number;
        savedBy: number;
        readingBy: number;
    }, {
        finishedBy: number;
        savedBy: number;
        readingBy: number;
    }>;
    statistics: z.ZodArray<z.ZodObject<{
        endDate: z.ZodDate;
        progressDelta: z.ZodNumber;
        pagesRead: z.ZodNumber;
        readingTimeMs: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        endDate: Date;
        readingTimeMs: number;
        progressDelta: number;
        pagesRead: number;
    }, {
        endDate: Date;
        readingTimeMs: number;
        progressDelta: number;
        pagesRead: number;
    }>, "many">;
}>, "strict", z.ZodTypeAny, {
    createdAt: Date;
    updatedAt: Date;
    picture: string;
    _count: {
        finishedBy: number;
        savedBy: number;
        readingBy: number;
    };
    slug: string;
    title: string;
    author: string;
    genres: {
        slug: string;
        name: string;
        icon: string;
        emoji: string;
    }[];
    description: string;
    recommendable: boolean;
    ebook: string;
    readingTime: number;
    chapters: number;
    rating: number;
    isPublic: boolean;
    statistics: {
        endDate: Date;
        readingTimeMs: number;
        progressDelta: number;
        pagesRead: number;
    }[];
}, {
    createdAt: Date;
    updatedAt: Date;
    picture: string;
    _count: {
        finishedBy: number;
        savedBy: number;
        readingBy: number;
    };
    slug: string;
    title: string;
    author: string;
    genres: {
        slug: string;
        name: string;
        icon: string;
        emoji: string;
    }[];
    description: string;
    recommendable: boolean;
    ebook: string;
    readingTime: number;
    chapters: number;
    rating: number;
    isPublic: boolean;
    statistics: {
        endDate: Date;
        readingTimeMs: number;
        progressDelta: number;
        pagesRead: number;
    }[];
}>>;
export declare class FullBook extends FullBook_base {
}
declare const CatalogOutput_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<z.objectUtil.extendShape<{
    data: z.ZodArray<z.ZodObject<z.objectUtil.extendShape<{
        description: z.ZodString;
        readingTime: z.ZodNumber;
        chapters: z.ZodNumber;
        rating: z.ZodNumber;
        isPublic: z.ZodBoolean;
        genres: z.ZodArray<z.ZodObject<{
            slug: z.ZodString;
            name: z.ZodString;
            icon: z.ZodString;
            emoji: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            slug: string;
            name: string;
            icon: string;
            emoji: string;
        }, {
            slug: string;
            name: string;
            icon: string;
            emoji: string;
        }>, "many">;
    }, {
        slug: z.ZodString;
        title: z.ZodString;
        picture: z.ZodString;
        author: z.ZodString;
    }>, "strip", z.ZodTypeAny, {
        picture: string;
        slug: string;
        title: string;
        author: string;
        genres: {
            slug: string;
            name: string;
            icon: string;
            emoji: string;
        }[];
        description: string;
        readingTime: number;
        chapters: number;
        rating: number;
        isPublic: boolean;
    }, {
        picture: string;
        slug: string;
        title: string;
        author: string;
        genres: {
            slug: string;
            name: string;
            icon: string;
            emoji: string;
        }[];
        description: string;
        readingTime: number;
        chapters: number;
        rating: number;
        isPublic: boolean;
    }>, "many">;
}, {
    canLoadMore: z.ZodBoolean;
    totalPages: z.ZodNumber;
}>, "strip", z.ZodTypeAny, {
    data: {
        picture: string;
        slug: string;
        title: string;
        author: string;
        genres: {
            slug: string;
            name: string;
            icon: string;
            emoji: string;
        }[];
        description: string;
        readingTime: number;
        chapters: number;
        rating: number;
        isPublic: boolean;
    }[];
    canLoadMore: boolean;
    totalPages: number;
}, {
    data: {
        picture: string;
        slug: string;
        title: string;
        author: string;
        genres: {
            slug: string;
            name: string;
            icon: string;
            emoji: string;
        }[];
        description: string;
        readingTime: number;
        chapters: number;
        rating: number;
        isPublic: boolean;
    }[];
    canLoadMore: boolean;
    totalPages: number;
}>>;
export declare class CatalogOutput extends CatalogOutput_base {
}
declare const InfoBySlug_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<z.objectUtil.extendShape<z.objectUtil.extendShape<{
    description: z.ZodString;
    readingTime: z.ZodNumber;
    chapters: z.ZodNumber;
    rating: z.ZodNumber;
    isPublic: z.ZodBoolean;
    genres: z.ZodArray<z.ZodObject<{
        slug: z.ZodString;
        name: z.ZodString;
        icon: z.ZodString;
        emoji: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        slug: string;
        name: string;
        icon: string;
        emoji: string;
    }, {
        slug: string;
        name: string;
        icon: string;
        emoji: string;
    }>, "many">;
}, {
    slug: z.ZodString;
    title: z.ZodString;
    picture: z.ZodString;
    author: z.ZodString;
}>, {
    fromSameAuthor: z.ZodArray<z.ZodObject<{
        slug: z.ZodString;
        title: z.ZodString;
        picture: z.ZodString;
        author: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        picture: string;
        slug: string;
        title: string;
        author: string;
    }, {
        picture: string;
        slug: string;
        title: string;
        author: string;
    }>, "many">;
}>, "strip", z.ZodTypeAny, {
    picture: string;
    slug: string;
    title: string;
    author: string;
    genres: {
        slug: string;
        name: string;
        icon: string;
        emoji: string;
    }[];
    description: string;
    readingTime: number;
    chapters: number;
    rating: number;
    isPublic: boolean;
    fromSameAuthor: {
        picture: string;
        slug: string;
        title: string;
        author: string;
    }[];
}, {
    picture: string;
    slug: string;
    title: string;
    author: string;
    genres: {
        slug: string;
        name: string;
        icon: string;
        emoji: string;
    }[];
    description: string;
    readingTime: number;
    chapters: number;
    rating: number;
    isPublic: boolean;
    fromSameAuthor: {
        picture: string;
        slug: string;
        title: string;
        author: string;
    }[];
}>>;
export declare class InfoBySlug extends InfoBySlug_base {
}
export {};
