import { z } from 'zod';
declare const FindOneGenreOutput_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<z.objectUtil.extendShape<{
    books: z.ZodArray<z.ZodObject<{
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
}, {
    slug: z.ZodString;
    name: z.ZodString;
    icon: z.ZodString;
    emoji: z.ZodString;
}>, "strip", z.ZodTypeAny, {
    slug: string;
    name: string;
    icon: string;
    emoji: string;
    books: {
        picture: string;
        slug: string;
        title: string;
        author: string;
    }[];
}, {
    slug: string;
    name: string;
    icon: string;
    emoji: string;
    books: {
        picture: string;
        slug: string;
        title: string;
        author: string;
    }[];
}>>;
export declare class FindOneGenreOutput extends FindOneGenreOutput_base {
}
declare const ShortGenre_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<{
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
}>>;
export declare class ShortGenre extends ShortGenre_base {
}
export {};
