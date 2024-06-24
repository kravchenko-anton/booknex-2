/// <reference types="multer" />
import { PrismaService } from '../utils/services/prisma.service';
import type { ParserDto } from './parser.dto';
export declare class ParserService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    catalog(searchTerm: string, page: number): Promise<{
        data: {
            picture: string;
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
            rating: number;
        }[];
        canLoadMore: boolean;
        totalPages: number;
    }>;
    remove(slug: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        slug: string;
        author: string;
        description: string;
        picture: string;
        rating: number;
    }>;
    unfold(file: Express.Multer.File): Promise<import("./parser.dto").UnfoldOutput>;
    bySlug(slug: string): Promise<{
        picture: string;
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
        rating: number;
    }>;
    parse(dto: ParserDto): Promise<void>;
}
