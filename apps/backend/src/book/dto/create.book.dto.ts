import { ApiProperty, PickType } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
	ArrayMinSize,
	IsArray,
	IsNumber,
	ValidateNested
} from 'class-validator'
import { Book } from '../book.entity'
import { PayloadEBook } from '../ebook.model'

export class CreateBookDto extends PickType(Book, [
	'author',
	'description',
	'rating',
	'title'
]) {
	@ApiProperty({ type: [PayloadEBook] })
	@IsArray()
	@ArrayMinSize(1)
	@ValidateNested()
	@Type(() => PayloadEBook)
	ebook: PayloadEBook[]

	@IsArray()
	@ArrayMinSize(2)
	@ApiProperty({
		description: 'Array of genres',
		example: [1, 2, 3],
		type: [Number],
		required: true
	})
	@IsNumber({}, { each: true })
	genres: number[]

	@ApiProperty({
		description: 'picture',
		required: true,
		type: String,
		format: 'binary'
	})
	picture: Express.Multer.File
}
