import { PrismaService } from '../utils/services/prisma.service';
export declare class GenreService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    catalog(): import(".prisma/client").Prisma.PrismaPromise<{
        slug: string;
        name: string;
        icon: string;
        emoji: string;
    }[]>;
    bySlug(slug: string): Promise<{
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
    }>;
}
