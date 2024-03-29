import { ApiProperty, PickType } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsArray, ValidateNested } from 'class-validator'
import { Review } from '../review/review.entity'
import { BaseCatalogModel } from '../utils/common/base-catalog.model'
import { Activity } from '../utils/services/activity/activity.model'
import { Book, BookWithCount } from './book.entity'

export class CatalogOutput extends BaseCatalogModel {
	@ApiProperty({ type: [Book] })
	@IsArray()
	@ValidateNested()
	@Type(() => Book)
	data: Book[]
}
export class BookInfoOutput extends PickType(Book, [
	'description',
	'title',
	'author',
	'genres',
	'picture',
	'readingTime',
	'slug',
	'rating'
]) {}

export class AdminBookInfoOutput extends BookWithCount {
	@ApiProperty({
		type: [Activity],
		description: 'book activities'
	})
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => Activity)
	activities: Activity[]
	@ApiProperty({
		type: [Review],
		description: 'book review'
	})
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => Review)
	review: Review[]
}
