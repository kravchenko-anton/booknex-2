import { ApiProperty, PartialType, PickType } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
	ArrayMinSize,
	IsArray,
	IsOptional,
	ValidateNested
} from 'class-validator'
import { Book } from '../book.entity'
import { PayloadEBook } from '../ebook/ebook.model'

export class UpdateBookPick extends PickType(Book, [
	'author',
	'description',
	'title',
	'isPublic',
	'genres',
	'rating',
	'picture'
]) {}
export class UpdateBookDto extends PartialType(UpdateBookPick) {
	@ApiProperty({ type: [PayloadEBook], required: false })
	@IsOptional()
	@IsArray()
	@ArrayMinSize(1)
	@ValidateNested({ each: true })
	@Type(() => PayloadEBook)
	ebook: PayloadEBook[]
}
