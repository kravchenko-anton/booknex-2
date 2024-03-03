import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsArray, ValidateNested } from 'class-validator'
import { ShortBook } from '../book/book.entity'
import { shortGenre } from '../genre/genre.entity'

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
