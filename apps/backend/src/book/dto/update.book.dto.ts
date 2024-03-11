import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger'
import { ArrayMaxSize, ArrayMinSize, IsArray, IsNumber } from 'class-validator'
import { Book } from '../book.entity'

export class UpdateBookDto extends PartialType(
	OmitType(Book, ['id', 'genres', 'readingTime'])
) {}

export class UpdateGenreDto {
	@ApiProperty({
		description: 'Array of genres',
		example: [1, 2, 3],
		type: [Number],
		required: false
	})
	@IsNumber({}, { each: true })
	@IsArray()
	@ArrayMinSize(1)
	@ArrayMaxSize(3)
	genres: number[]
}
