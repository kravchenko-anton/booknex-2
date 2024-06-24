import { UpdateBookDto } from './book.dto';
declare const UpdateBookDtoExtended_base: import("@nestjs/common").Type<Pick<UpdateBookDto, "picture" | "title" | "author" | "description" | "rating" | "isPublic">>;
export declare class UpdateBookDtoExtended extends UpdateBookDtoExtended_base {
    ebook?: string;
    pagesCount?: number;
    slug?: string;
    readingTime?: number;
    chapters?: number;
    genres?: {
        set: {
            slug: string;
        }[];
    };
    mainGenre?: {
        connect: {
            slug: string;
        };
    };
}
export {};
