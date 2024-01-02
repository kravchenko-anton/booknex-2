import { Controller, Get, Param } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import type {
	AllGenreOutput,
	GenreByIdOutput
} from '../../../../libs/global/services-types/genre-types'
import { Auth } from '../decorator/auth.decorator'
import { GenreService } from './genre.service'

@ApiTags('genre')
@ApiBearerAuth()
@Controller('genre')
export class GenreController {
	constructor(private readonly genreService: GenreService) {}

	@Get()
	async all(): Promise<AllGenreOutput> {
		return this.genreService.all()
	}

	@Auth()
	@Get('/by-id/:id')
	async byId(@Param('id') genreId: string): Promise<GenreByIdOutput> {
		return this.genreService.byId(+genreId)
	}
}
