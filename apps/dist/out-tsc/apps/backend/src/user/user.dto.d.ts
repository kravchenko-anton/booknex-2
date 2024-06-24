import { z } from 'zod';
declare const User_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<{
    id: z.ZodString;
    createdAt: z.ZodDate;
    email: z.ZodString;
    socialId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    picture: z.ZodString;
    fullName: z.ZodString;
    location: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: Date;
    email: string;
    picture: string;
    fullName: string;
    location: string;
    socialId?: string | null | undefined;
}, {
    id: string;
    createdAt: Date;
    email: string;
    picture: string;
    fullName: string;
    location: string;
    socialId?: string | null | undefined;
}>>;
export declare class User extends User_base {
}
declare const ReadingHistory_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<{
    startDate: z.ZodDate;
    endDate: z.ZodDate;
    startProgress: z.ZodNumber;
    endProgress: z.ZodNumber;
    progressDelta: z.ZodNumber;
    readingTimeMs: z.ZodNumber;
    scrollPosition: z.ZodNumber;
    bookSlug: z.ZodString;
}, "strip", z.ZodTypeAny, {
    bookSlug: string;
    startDate: Date;
    endDate: Date;
    readingTimeMs: number;
    scrollPosition: number;
    startProgress: number;
    endProgress: number;
    progressDelta: number;
}, {
    bookSlug: string;
    startDate: Date;
    endDate: Date;
    readingTimeMs: number;
    scrollPosition: number;
    startProgress: number;
    endProgress: number;
    progressDelta: number;
}>>;
export declare class ReadingHistory extends ReadingHistory_base {
}
declare const UserStatistics_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<{
    progressByCurrentWeek: z.ZodArray<z.ZodObject<{
        day: z.ZodString;
        isCurrentDay: z.ZodBoolean;
        readingTimeMs: z.ZodNumber;
        dayProgress: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        readingTimeMs: number;
        day: string;
        isCurrentDay: boolean;
        dayProgress: number;
    }, {
        readingTimeMs: number;
        day: string;
        isCurrentDay: boolean;
        dayProgress: number;
    }>, "many">;
    pepTalk: z.ZodString;
    goalMinutes: z.ZodNumber;
    userSteak: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    goalMinutes: number;
    progressByCurrentWeek: {
        readingTimeMs: number;
        day: string;
        isCurrentDay: boolean;
        dayProgress: number;
    }[];
    pepTalk: string;
    userSteak: number;
}, {
    goalMinutes: number;
    progressByCurrentWeek: {
        readingTimeMs: number;
        day: string;
        isCurrentDay: boolean;
        dayProgress: number;
    }[];
    pepTalk: string;
    userSteak: number;
}>>;
export declare class UserStatistics extends UserStatistics_base {
}
declare const UserCatalogOutput_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<z.objectUtil.extendShape<{
    data: z.ZodArray<z.ZodObject<z.objectUtil.extendShape<{
        id: z.ZodString;
        email: z.ZodString;
        selectedGenres: z.ZodArray<z.ZodObject<{
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
        statistics: z.ZodArray<z.ZodObject<{
            endDate: z.ZodDate;
            progressDelta: z.ZodNumber;
            readingTimeMs: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            endDate: Date;
            readingTimeMs: number;
            progressDelta: number;
        }, {
            endDate: Date;
            readingTimeMs: number;
            progressDelta: number;
        }>, "many">;
        _count: z.ZodObject<{
            savedBooks: z.ZodNumber;
            finishedBooks: z.ZodNumber;
            readingBooks: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            savedBooks: number;
            finishedBooks: number;
            readingBooks: number;
        }, {
            savedBooks: number;
            finishedBooks: number;
            readingBooks: number;
        }>;
    }, {
        id: z.ZodString;
        createdAt: z.ZodDate;
        email: z.ZodString;
        socialId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        picture: z.ZodString;
        fullName: z.ZodString;
        location: z.ZodString;
    }>, "strip", z.ZodTypeAny, {
        id: string;
        createdAt: Date;
        email: string;
        picture: string;
        fullName: string;
        location: string;
        selectedGenres: {
            slug: string;
            name: string;
            icon: string;
            emoji: string;
        }[];
        _count: {
            savedBooks: number;
            finishedBooks: number;
            readingBooks: number;
        };
        statistics: {
            endDate: Date;
            readingTimeMs: number;
            progressDelta: number;
        }[];
        socialId?: string | null | undefined;
    }, {
        id: string;
        createdAt: Date;
        email: string;
        picture: string;
        fullName: string;
        location: string;
        selectedGenres: {
            slug: string;
            name: string;
            icon: string;
            emoji: string;
        }[];
        _count: {
            savedBooks: number;
            finishedBooks: number;
            readingBooks: number;
        };
        statistics: {
            endDate: Date;
            readingTimeMs: number;
            progressDelta: number;
        }[];
        socialId?: string | null | undefined;
    }>, "many">;
}, {
    canLoadMore: z.ZodBoolean;
    totalPages: z.ZodNumber;
}>, "strip", z.ZodTypeAny, {
    data: {
        id: string;
        createdAt: Date;
        email: string;
        picture: string;
        fullName: string;
        location: string;
        selectedGenres: {
            slug: string;
            name: string;
            icon: string;
            emoji: string;
        }[];
        _count: {
            savedBooks: number;
            finishedBooks: number;
            readingBooks: number;
        };
        statistics: {
            endDate: Date;
            readingTimeMs: number;
            progressDelta: number;
        }[];
        socialId?: string | null | undefined;
    }[];
    canLoadMore: boolean;
    totalPages: number;
}, {
    data: {
        id: string;
        createdAt: Date;
        email: string;
        picture: string;
        fullName: string;
        location: string;
        selectedGenres: {
            slug: string;
            name: string;
            icon: string;
            emoji: string;
        }[];
        _count: {
            savedBooks: number;
            finishedBooks: number;
            readingBooks: number;
        };
        statistics: {
            endDate: Date;
            readingTimeMs: number;
            progressDelta: number;
        }[];
        socialId?: string | null | undefined;
    }[];
    canLoadMore: boolean;
    totalPages: number;
}>>;
export declare class UserCatalogOutput extends UserCatalogOutput_base {
}
declare const UserLibraryOutput_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<{
    readingBooks: z.ZodArray<z.ZodObject<z.objectUtil.extendShape<{
        slug: z.ZodString;
        title: z.ZodString;
        picture: z.ZodString;
        author: z.ZodString;
    }, {
        readingHistory: z.ZodNullable<z.ZodObject<{
            progress: z.ZodNumber;
            scrollPosition: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            scrollPosition: number;
            progress: number;
        }, {
            scrollPosition: number;
            progress: number;
        }>>;
    }>, "strip", z.ZodTypeAny, {
        picture: string;
        readingHistory: {
            scrollPosition: number;
            progress: number;
        } | null;
        slug: string;
        title: string;
        author: string;
    }, {
        picture: string;
        readingHistory: {
            scrollPosition: number;
            progress: number;
        } | null;
        slug: string;
        title: string;
        author: string;
    }>, "many">;
    finishedBooks: z.ZodArray<z.ZodObject<{
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
    savedBooks: z.ZodArray<z.ZodObject<{
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
}, "strip", z.ZodTypeAny, {
    savedBooks: {
        picture: string;
        slug: string;
        title: string;
        author: string;
    }[];
    finishedBooks: {
        picture: string;
        slug: string;
        title: string;
        author: string;
    }[];
    readingBooks: {
        picture: string;
        readingHistory: {
            scrollPosition: number;
            progress: number;
        } | null;
        slug: string;
        title: string;
        author: string;
    }[];
}, {
    savedBooks: {
        picture: string;
        slug: string;
        title: string;
        author: string;
    }[];
    finishedBooks: {
        picture: string;
        slug: string;
        title: string;
        author: string;
    }[];
    readingBooks: {
        picture: string;
        readingHistory: {
            scrollPosition: number;
            progress: number;
        } | null;
        slug: string;
        title: string;
        author: string;
    }[];
}>>;
export declare class UserLibraryOutput extends UserLibraryOutput_base {
}
export {};
