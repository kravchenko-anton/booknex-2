import { Controller, Get, Param } from '@nestjs/common'
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { Auth } from '../auth/decorators/auth.decorator'
import { FindOneGenreOutput, ShortGenre } from './genre.dto'

import { GenreService } from './genre.service'

@ApiTags('🔖 genre')
@ApiBearerAuth()
@Controller('genre')
export class GenreController {
	constructor(private readonly genreService: GenreService) {}

	@Get()
	@ApiOkResponse({ type: [ShortGenre] })
	async catalog(): Promise<ShortGenre[]> {
		return this.genreService.catalog()
	}

	@Auth()
	@Get('/by-slug/:slug')
	@ApiOkResponse({ type: FindOneGenreOutput })
	async bySlug(@Param('slug') genreSlug: string): Promise<FindOneGenreOutput> {
		return this.genreService.bySlug(genreSlug)
	}
}
