import { ApiProperty, PickType } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsArray, IsNumber, ValidateNested } from 'class-validator'
import { Review } from '../review/review.entity'
import { BaseCatalogModel } from '../utils/common/base-catalog.model'
import { Activity } from '../utils/services/activity/activity.model'
import { Book, FullBook } from './book.entity'

export class CountOutput {
	@ApiProperty({ example: 1, description: 'FinishedBy', type: Number })
	@IsNumber()
	finishedBy: number

	@ApiProperty({ example: 1, description: 'ReadingBy', type: Number })
	@IsNumber()
	readingBy: number

	@ApiProperty({ example: 1, description: 'SavedBy', type: Number })
	@IsNumber()
	savedBy: number
}

export class AdminCatalogOutput extends BaseCatalogModel {
	@ApiProperty({ type: [Book] })
	@IsArray()
	@ValidateNested()
	@Type(() => Book)
	data: Book[]
}
export class InfoByIdOutput extends PickType(Book, [
	'description',
	'id',
	'title',
	'author',
	'genres',
	'picture'
]) {}

export class AdminInfoByIdOutput extends FullBook {
	@ApiProperty({
		type: [Activity],
		description: 'book activities'
	})
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => Activity)
	activities: Activity[]
	@ApiProperty({
		type: CountOutput,
		description: 'book count'
	})
	@ValidateNested()
	@Type(() => CountOutput)
	_count: CountOutput
	@ApiProperty({
		type: [Review],
		description: 'book review'
	})
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => Review)
	review: Review[]
}
