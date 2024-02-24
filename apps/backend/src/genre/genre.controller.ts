import { Controller, Get, Param } from '@nestjs/common'
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { Auth } from '../auth/decorators/auth.decorator'
import { CurrentUser } from '../auth/decorators/user.decorator'
import { byIdOutput, shortGenre } from './genre.model'

import { GenreService } from './genre.service'

@ApiTags('genre')
@ApiBearerAuth()
@Controller('genre')
export class GenreController {
	constructor(private readonly genreService: GenreService) {}

	@Get()
	@ApiOkResponse({ type: [shortGenre] })
	async all(): Promise<shortGenre[]> {
		return this.genreService.all()
	}

	@Auth()
	@Get('/by-id/:id')
	@ApiOkResponse({ type: byIdOutput })
	async byId(
		@Param('id') genreId: number,
		@CurrentUser('id') userId: number
	): Promise<byIdOutput> {
		return this.genreService.findOne(+genreId, +userId)
	}
}
