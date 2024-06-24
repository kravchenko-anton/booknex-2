import { z } from 'zod';
declare const BookTemplate_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<{
    slug: z.ZodString;
    title: z.ZodString;
    author: z.ZodString;
    description: z.ZodString;
    picture: z.ZodString;
    rating: z.ZodNumber;
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
    rating: number;
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
    rating: number;
}>>;
export declare class BookTemplate extends BookTemplate_base {
}
declare const ParserDto_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<{
    url: z.ZodString;
    page: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    page: number;
    url: string;
}, {
    page: number;
    url: string;
}>>;
export declare class ParserDto extends ParserDto_base {
}
declare const UnfoldOutput_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<{
    chapters: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
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
    images: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        href: z.ZodString;
        mimeType: z.ZodString;
        data: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        data: string;
        href: string;
        mimeType: string;
    }, {
        id: string;
        data: string;
        href: string;
        mimeType: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    chapters: {
        id: string;
        name: string;
        text: string;
    }[];
    images: {
        id: string;
        data: string;
        href: string;
        mimeType: string;
    }[];
}, {
    chapters: {
        id: string;
        name: string;
        text: string;
    }[];
    images: {
        id: string;
        data: string;
        href: string;
        mimeType: string;
    }[];
}>>;
export declare class UnfoldOutput extends UnfoldOutput_base {
}
declare const BookTemplateCatalogOutput_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<z.objectUtil.extendShape<{
    data: z.ZodArray<z.ZodObject<{
        slug: z.ZodString;
        title: z.ZodString;
        author: z.ZodString;
        description: z.ZodString;
        picture: z.ZodString;
        rating: z.ZodNumber;
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
        rating: number;
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
        rating: number;
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
        rating: number;
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
        rating: number;
    }[];
    canLoadMore: boolean;
    totalPages: number;
}>>;
export declare class BookTemplateCatalogOutput extends BookTemplateCatalogOutput_base {
}
export {};
