import { CreateReaction, ReactionByBookOutput, UpdateReaction } from '@/src/reaction/reaction.dto';
import { ReactionService } from './reaction.service';
export declare class ReactionController {
    private readonly reactionService;
    constructor(reactionService: ReactionService);
    create(userId: string, dto: CreateReaction): Promise<{
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
    reactionList(userId: string): Promise<({
        count: number;
        picture: string;
        slug: string;
        title: string;
        author: string;
    } | undefined)[]>;
    reactionByBook(bookSlug: string, userId: string): Promise<ReactionByBookOutput[]>;
    update(userId: string, dto: UpdateReaction): Promise<{
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
