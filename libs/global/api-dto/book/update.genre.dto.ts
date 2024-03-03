import { IsNumber } from 'class-validator'
import type { UpdateGenreDto as UpdateGenreType } from '../../api-client/models/update-genre-dto'

export class UpdateGenreDto implements UpdateGenreType {
	@IsNumber({}, { each: true })
	genres: number[]
}
