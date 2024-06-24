import { z } from 'zod';
declare const FeaturedOutput_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<{
    picksOfWeek: z.ZodArray<z.ZodObject<{
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
    bestSellingBooks: z.ZodArray<z.ZodObject<{
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
    newReleases: z.ZodArray<z.ZodObject<{
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
    booksBySelectedGenres: z.ZodArray<z.ZodArray<z.ZodObject<{
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
    }>, "many">, "many">;
}, "strip", z.ZodTypeAny, {
    picksOfWeek: {
        picture: string;
        slug: string;
        title: string;
        author: string;
    }[];
    genres: {
        slug: string;
        name: string;
        icon: string;
        emoji: string;
    }[];
    bestSellingBooks: {
        picture: string;
        slug: string;
        title: string;
        author: string;
    }[];
    newReleases: {
        picture: string;
        slug: string;
        title: string;
        author: string;
    }[];
    booksBySelectedGenres: {
        picture: string;
        slug: string;
        title: string;
        author: string;
    }[][];
}, {
    picksOfWeek: {
        picture: string;
        slug: string;
        title: string;
        author: string;
    }[];
    genres: {
        slug: string;
        name: string;
        icon: string;
        emoji: string;
    }[];
    bestSellingBooks: {
        picture: string;
        slug: string;
        title: string;
        author: string;
    }[];
    newReleases: {
        picture: string;
        slug: string;
        title: string;
        author: string;
    }[];
    booksBySelectedGenres: {
        picture: string;
        slug: string;
        title: string;
        author: string;
    }[][];
}>>;
export declare class FeaturedOutput extends FeaturedOutput_base {
}
export {};
