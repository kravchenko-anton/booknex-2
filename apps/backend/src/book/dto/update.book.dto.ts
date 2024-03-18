import { ApiProperty, PartialType, PickType } from '@nestjs/swagger'
import { ArrayMaxSize, ArrayMinSize, IsArray, IsNumber } from 'class-validator'
import { Book } from '../book.entity'

export class UpdateBookPick extends PickType(Book, [
	'author',
	'description',
	'title',
	'visible',
	'rating'
]) {}
export class UpdateBookDto extends PartialType(UpdateBookPick) {}
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

export class updatePictureDto {
	@ApiProperty({
		description: 'picture',
		required: true,
		type: String,
		format: 'binary'
	})
	picture: Buffer
}
