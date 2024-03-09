import { ApiProperty, OmitType } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
	ArrayMinSize,
	IsArray,
	IsNumber,
	ValidateNested
} from 'class-validator'
import { Book } from '../book.entity'
import { EBookPayload } from '../ebook.model'

export class CreateBookDto extends OmitType(Book, [
	'readingTime',
	'genres',
	'id',
	'visible'
]) {
	@ApiProperty({ type: [EBookPayload] })
	@IsArray()
	@ValidateNested()
	@Type(() => EBookPayload)
	ebook: EBookPayload[]

	@IsArray()
	@ArrayMinSize(1)
	@ApiProperty({
		description: 'Array of genres',
		example: [1, 2, 3],
		type: [Number],
		required: true
	})
	@IsNumber({}, { each: true })
	genres: number[]
}
