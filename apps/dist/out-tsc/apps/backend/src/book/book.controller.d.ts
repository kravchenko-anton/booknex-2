import { CatalogOutput, CreateBookDto, FullBook, InfoBySlug, UpdateBookDto } from '@/src/book/book.dto';
import { BookService } from './book.service';
export declare class BookController {
    private readonly bookService;
    constructor(bookService: BookService);
    infoBySlug(bookSlug: string): Promise<InfoBySlug>;
    adminInfoBySlug(slug: string): Promise<FullBook>;
    catalog(searchTerm: string, page: number): Promise<CatalogOutput>;
    create(dto: CreateBookDto): Promise<void>;
    update(bookSlug: string, dto: UpdateBookDto): Promise<void>;
    remove(slug: string): Promise<void>;
}
