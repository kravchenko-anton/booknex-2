import { ApiProperty, OmitType } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
	ArrayMinSize,
	IsArray,
	IsNumber,
	ValidateNested
} from 'class-validator'
import { Book } from '../book.entity'
import { PayloadEBook } from '../ebook.model'

export class CreateBookDto extends OmitType(Book, [
	'readingTime',
	'genres',
	'id',
	'visible',
	'chapters'
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
}
