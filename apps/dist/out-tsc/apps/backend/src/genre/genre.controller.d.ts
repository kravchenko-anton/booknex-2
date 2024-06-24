import { FindOneGenreOutput, ShortGenre } from './genre.dto';
import { GenreService } from './genre.service';
export declare class GenreController {
    private readonly genreService;
    constructor(genreService: GenreService);
    catalog(): Promise<ShortGenre[]>;
    bySlug(genreSlug: string): Promise<FindOneGenreOutput>;
}
