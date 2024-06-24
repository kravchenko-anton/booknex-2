import type { ReadingHistory } from '@/src/user/user.dto';
import type { Prisma } from '@prisma/client';
import { PrismaService } from '../utils/services/prisma.service';
export declare class UserService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getUserById(id: string, selectObject?: Prisma.UserSelect): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        goalMinutes: number;
        socialId: string | null;
        password: string | null;
        authType: import(".prisma/client").$Enums.AuthType;
        picture: string;
        fullName: string;
        location: string;
        role: import(".prisma/client").$Enums.Role;
        selectedGenres: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
            name: string;
            icon: string;
            emoji: string;
        }[];
        reactions: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            type: string;
            description: string | null;
            text: string;
            xpath: string;
            startOffset: number;
            endOffset: number;
            userId: string;
            bookSlug: string;
        }[];
        savedBooks: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            slug: string;
            author: string;
            description: string;
            recommendable: boolean;
            picture: string;
            ebook: string;
            readingTime: number;
            chapters: number;
            pagesCount: number;
            rating: number;
            isPublic: boolean;
            mainGenreId: string;
        }[];
        finishedBooks: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            slug: string;
            author: string;
            description: string;
            recommendable: boolean;
            picture: string;
            ebook: string;
            readingTime: number;
            chapters: number;
            pagesCount: number;
            rating: number;
            isPublic: boolean;
            mainGenreId: string;
        }[];
        readingBooks: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            slug: string;
            author: string;
            description: string;
            recommendable: boolean;
            picture: string;
            ebook: string;
            readingTime: number;
            chapters: number;
            pagesCount: number;
            rating: number;
            isPublic: boolean;
            mainGenreId: string;
        }[];
        readingHistory: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            startDate: Date;
            endDate: Date;
            readingTimeMs: number;
            scrollPosition: number;
            startProgress: number;
            endProgress: number;
            progressDelta: number;
            bookSlug: string;
            userId: string;
        }[];
        _count: {
            selectedGenres: number;
            reactions: number;
            savedBooks: number;
            finishedBooks: number;
            readingBooks: number;
            readingHistory: number;
        };
    }>;
    syncHistory(dto: ReadingHistory[], userId: string): Promise<void>;
    adjustGoal(userId: string, goal: number): Promise<void>;
    userStatistics(userId: string): Promise<{
        userSteak: number;
        pepTalk: string;
        progressByCurrentWeek: import("global/api-client").UserStatisticsProgressByCurrentWeekInner[];
        goalMinutes: number;
    }>;
    library(userId: string): Promise<{
        readingBooks: {
            readingHistory: {
                scrollPosition: number;
                endDate: Date | undefined;
                progress: number;
            };
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
        savedBooks: {
            picture: string;
            slug: string;
            title: string;
            author: string;
        }[];
    }>;
    catalog(searchTerm: string, page: number): Promise<{
        data: {
            statistics: import("@/src/utils/services/statisticReduce.service").StatisticReduceOutputType;
            id: string;
            createdAt: Date;
            email: string;
            socialId: string | null;
            picture: string;
            fullName: string;
            location: string;
            role: import(".prisma/client").$Enums.Role;
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
        }[];
        canLoadMore: boolean;
        totalPages: number;
    }>;
    remove(id: string): Promise<void>;
    startReading(userId: string, slug: string): Promise<void>;
    removeFromLibrary(userId: string, slug: string): Promise<void>;
    finishReading(userId: string, slug: string): Promise<void>;
    toggleSave(userId: string, slug: string): Promise<boolean>;
    private checkBookExist;
    isSaved(userId: string, slug: string): Promise<boolean>;
}
