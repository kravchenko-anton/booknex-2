import { Controller, Get, Param } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { Auth } from '../auth/decorators/auth.decorator'
import { CurrentUser } from '../auth/decorators/user.decorator'

import { GenreService } from './genre.service'

@ApiTags('genre')
@ApiBearerAuth()
@Controller('genre')
export class GenreController {
	constructor(private readonly genreService: GenreService) {}

	@Get()
	async all() {
		return this.genreService.all()
	}

	@Auth()
	@Get('/by-id/:id')
	async byId(@Param('id') genreId: number, @CurrentUser('id') userId: number) {
		return this.genreService.findOne(+genreId, +userId)
	}
}
