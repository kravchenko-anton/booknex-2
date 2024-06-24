/// <reference types="multer" />
import { BookTemplateCatalogOutput, UnfoldOutput } from '@/src/parser/parser.dto';
import { BookTemplate, ParserDto } from './parser.dto';
import { ParserService } from './parser.service';
export declare class ParserController {
    private readonly parserService;
    constructor(parserService: ParserService);
    catalog(searchTerm: string, page: number): Promise<BookTemplateCatalogOutput>;
    bySlug(slug: string): Promise<BookTemplate>;
    parse(dto: ParserDto): Promise<void>;
    unfold(file: Express.Multer.File): Promise<UnfoldOutput>;
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
}
