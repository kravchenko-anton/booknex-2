import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsArray, ValidateNested } from 'class-validator'
import { ShortBook } from '../book/book.model'
import { shortGenre } from '../genre/genre.model'

export class FeaturedOutput {
	@ApiProperty({ type: [shortGenre] })
	@ValidateNested({ each: true })
	@Type(() => shortGenre)
	relatedGenres: shortGenre[]

	@ApiProperty({ type: [ShortBook] })
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => ShortBook)
	recommendations: ShortBook[]
	@ApiProperty({ type: [ShortBook] })
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => ShortBook)
	popularBooks: ShortBook[]
	@ApiProperty({ type: [ShortBook] })
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => ShortBook)
	bestSellingBooks: ShortBook[]
	@ApiProperty({ type: [ShortBook] })
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => ShortBook)
	newReleases: ShortBook[]
}
