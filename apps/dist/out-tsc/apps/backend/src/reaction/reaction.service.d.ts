import type { UpdateReaction } from '@/src/reaction/reaction.dto';
import { PrismaService } from '@/src/utils/services/prisma.service';
import type { CreateReaction } from 'global/api-client';
export declare class ReactionService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(userId: string, createReactionDto: CreateReaction): Promise<{
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
    }>;
    update(userId: string, updateReactionDto: UpdateReaction): Promise<{
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
    }>;
    reactionByBook(bookSlug: string, userId: string): Promise<{
        type: string;
        id: string;
        createdAt: Date;
        text: string;
        xpath: string;
        startOffset: number;
        endOffset: number;
    }[]>;
    reactionList(userId: string): Promise<({
        count: number;
        picture: string;
        slug: string;
        title: string;
        author: string;
    } | undefined)[]>;
    remove(id: string, userId: string): Promise<{
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
    }>;
}
