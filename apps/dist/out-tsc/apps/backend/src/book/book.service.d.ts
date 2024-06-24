import type { Prisma } from '@prisma/client';
import { StorageService } from '../storage/storage.service';
import { PrismaService } from '../utils/services/prisma.service';
import type { Book, CreateBookDto, UpdateBookDto } from './book.dto';
export declare class BookService {
    private readonly prisma;
    private storageService;
    constructor(prisma: PrismaService, storageService: StorageService);
    infoBySlug(slug: string): Promise<{
        fromSameAuthor: {
            picture: string;
            slug: string;
            title: string;
            author: string;
        }[];
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
        mainGenre: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
            name: string;
            icon: string;
            emoji: string;
        };
    }>;
    infoBySlugAdmin(slug: string): Promise<{
        statistics: import("@/src/utils/services/statisticReduce.service").StatisticReduceOutputType;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        picture: string;
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
        _count: {
            mainGenre: number;
            genres: number;
            finishedBy: number;
            savedBy: number;
            readingBy: number;
            readingHistory: number;
            reactions: number;
            similarBooks: number;
            similarBy: number;
        };
        slug: string;
        title: string;
        author: string;
        genres: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
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
        pagesCount: number;
        rating: number;
        isPublic: boolean;
        mainGenreId: string;
        mainGenre: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
            name: string;
            icon: string;
            emoji: string;
        };
        finishedBy: {
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
        }[];
        savedBy: {
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
        }[];
        readingBy: {
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
        }[];
        similarBooks: {
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
        similarBy: {
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
    }>;
    catalog(searchTerm: string, page: number): Promise<{
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
            mainGenre: {
                slug: string;
                name: string;
                icon: string;
                emoji: string;
            };
        }[];
        canLoadMore: boolean;
        totalPages: number;
    }>;
    create(dto: CreateBookDto): Promise<void>;
    remove(slug: string): Promise<void>;
    update(slug: string, dto: UpdateBookDto): Promise<void>;
    getGenres(genres: Book['genres']): Promise<{
        mainGenreSlug: string;
        genreIds: {
            slug: string;
        }[];
    }>;
    checkExist({ where, adminVisible }: {
        where: Prisma.BookWhereUniqueInput;
        adminVisible?: boolean;
    }): Promise<boolean>;
}
