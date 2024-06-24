import { ShortBook } from '../book/book.dto';
import { FeaturedOutput } from './catalog.dto';
import { CatalogService } from './catalog.service';
export declare class CatalogController {
    private readonly catalogService;
    constructor(catalogService: CatalogService);
    search(query: string): Promise<ShortBook[]>;
    featured(userId: string): Promise<FeaturedOutput>;
    picksOfTheWeek(): Promise<ShortBook[]>;
}
