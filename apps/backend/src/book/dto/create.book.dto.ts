import { ApiProperty, PickType } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { ArrayMinSize, ValidateNested } from 'class-validator'
import { Book } from '../book.entity'
import { PayloadEBook } from '../ebook/ebook.model'

export class CreateBookDto extends PickType(Book, [
	'author',
	'description',
	'rating',
	'title',
	'genres',
	'picture'
]) {
	@ApiProperty({ type: [PayloadEBook] })
	@ValidateNested({ each: true })
	@ArrayMinSize(1)
	@Type(() => PayloadEBook)
	ebook: PayloadEBook[]
}
