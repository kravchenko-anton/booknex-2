import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsArray, ValidateNested } from 'class-validator'
import { ShortBook } from '../book/book.entity'
import { ShortGenre } from './genre.entity'

export class FindOneGenreOutput extends ShortGenre {
	@ApiProperty({ type: [ShortBook] })
	@IsArray()
	@ValidateNested()
	@Type(() => ShortBook)
	mainBooks: ShortBook[]
}
