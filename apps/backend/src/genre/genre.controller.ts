import { Controller, Get, Param } from '@nestjs/common'
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { Auth } from '../auth/decorators/auth.decorator'
import { CurrentUser } from '../auth/decorators/user.decorator'
import { ShortGenre } from './genre.entity'
import { GenreByIdOutput } from './genre.model'

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
	@Get('/by-id/:id')
	@ApiOkResponse({ type: GenreByIdOutput })
	async byId(
		@Param('id') genreId: number,
		@CurrentUser('id') userId: number
	): Promise<GenreByIdOutput> {
		return this.genreService.findOne(+genreId, +userId)
	}
}
