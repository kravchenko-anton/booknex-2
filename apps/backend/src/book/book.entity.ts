import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
	ArrayMinSize,
	IsArray,
	IsBoolean,
	IsNumber,
	IsString,
	Max,
	MaxLength,
	Min,
	MinLength,
	ValidateNested
} from 'class-validator'
import { ShortGenre } from '../genre/genre.entity'
import { Review } from '../review/review.entity'
import { Activity } from '../utils/services/activity/activity.model'

export class ShortBook {
	@ApiProperty({ example: 1, description: 'book slug', type: String })
	@IsNumber()
	slug: string

	@ApiProperty({ example: 'title', description: 'book title', type: String })
	@IsString()
	title: string
	@ApiProperty({
		example: 'picture',
		description: 'book picture',
		type: String
	})
	@IsString()
	picture: string

	@ApiProperty({ example: 'author', description: 'book author', type: String })
	@IsString()
	author: string
}

export class Book extends ShortBook {
	@ApiProperty({
		example: 'description',
		description: 'book description',
		type: String
	})
	@IsString()
	@MinLength(10)
	@MaxLength(1000)
	description: string

	@ApiProperty({ example: 100, description: 'book readingTime', type: Number })
	@IsNumber()
	readingTime: number

	@ApiProperty({
		example: 100,
		description: 'book chapters count',
		type: Number
	})
	@IsNumber()
	@Min(1)
	chapters: number

	@ApiProperty({ example: 5, description: 'book rating', type: Number })
	@IsNumber()
	@Min(1)
	@Max(5)
	rating: number

	@ApiProperty({ example: true, description: 'book visibility', type: Boolean })
	@IsBoolean()
	visible: boolean

	@ApiProperty({ type: [ShortGenre] })
	@IsArray()
	@ArrayMinSize(1)
	@ValidateNested()
	@Type(() => ShortGenre)
	genres: {
		slug: string
		name: string
	}[]
}
export class BookCount {
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

export class FullBook extends Book {
	@ApiProperty({
		example: '2021-07-01',
		description: 'book created at',
		type: String
	})
	@IsString()
	createdAt: Date

	@ApiProperty({
		example: '2021-07-01',
		description: 'book updated at',
		type: String
	})
	@IsString()
	updatedAt: Date

	@ApiProperty({ example: 'ebook', description: 'book ebook', type: String })
	@IsString()
	ebook: string

	@ApiProperty({
		type: BookCount,
		description: 'book count'
	})
	@ValidateNested()
	@Type(() => BookCount)
	_count: BookCount

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
