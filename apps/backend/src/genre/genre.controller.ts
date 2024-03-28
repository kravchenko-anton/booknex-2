import { Controller, Get, Param } from '@nestjs/common'
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { Auth } from '../auth/decorators/auth.decorator'
import { CurrentUser } from '../auth/decorators/user.decorator'
import { ShortGenre } from './genre.entity'
import { FindOneGenreOutput } from './genre.model'

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

	// @Get('/setup')
	// async setupGenre() {
	//   return this.genreService.setupGenre();
	// }

	@Auth()
	@Get('/by-slug/:slug')
	@ApiOkResponse({ type: FindOneGenreOutput })
	async bySlug(
		@Param('slug') genreSlug: string,
		@CurrentUser('id') userId: number
	): Promise<FindOneGenreOutput> {
		return this.genreService.findOne(genreSlug, +userId)
	}
}
