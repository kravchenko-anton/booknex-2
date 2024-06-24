import { z } from 'zod';
declare const CreateReaction_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<{
    bookSlug: z.ZodString;
    type: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    text: z.ZodString;
    xpath: z.ZodString;
    startOffset: z.ZodNumber;
    endOffset: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type: string;
    text: string;
    xpath: string;
    startOffset: number;
    endOffset: number;
    bookSlug: string;
    description?: string | undefined;
}, {
    type: string;
    text: string;
    xpath: string;
    startOffset: number;
    endOffset: number;
    bookSlug: string;
    description?: string | undefined;
}>>;
export declare class CreateReaction extends CreateReaction_base {
}
declare const UpdateReaction_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    type: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    text: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    xpath: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    startOffset: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    endOffset: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    type?: string | undefined;
    id?: string | undefined;
    description?: string | undefined;
    text?: string | undefined;
    xpath?: string | undefined;
    startOffset?: number | undefined;
    endOffset?: number | undefined;
}, {
    type?: string | undefined;
    id?: string | undefined;
    description?: string | undefined;
    text?: string | undefined;
    xpath?: string | undefined;
    startOffset?: number | undefined;
    endOffset?: number | undefined;
}>>;
export declare class UpdateReaction extends UpdateReaction_base {
}
declare const ReactionListOutput_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<{
    count: z.ZodNumber;
    picture: z.ZodString;
    slug: z.ZodString;
    title: z.ZodString;
    author: z.ZodString;
}, "strip", z.ZodTypeAny, {
    picture: string;
    slug: string;
    title: string;
    author: string;
    count: number;
}, {
    picture: string;
    slug: string;
    title: string;
    author: string;
    count: number;
}>>;
export declare class ReactionListOutput extends ReactionListOutput_base {
}
declare const ReactionByBookOutput_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<{
    id: z.ZodString;
    type: z.ZodString;
    text: z.ZodString;
    xpath: z.ZodString;
    createdAt: z.ZodDate;
    startOffset: z.ZodNumber;
    endOffset: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type: string;
    id: string;
    createdAt: Date;
    text: string;
    xpath: string;
    startOffset: number;
    endOffset: number;
}, {
    type: string;
    id: string;
    createdAt: Date;
    text: string;
    xpath: string;
    startOffset: number;
    endOffset: number;
}>>;
export declare class ReactionByBookOutput extends ReactionByBookOutput_base {
}
export {};
