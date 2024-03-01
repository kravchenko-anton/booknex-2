import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
	IsArray,
	IsBoolean,
	IsNumber,
	IsString,
	ValidateNested
} from 'class-validator'
import { shortGenre } from '../genre/genre.model'
import { Review } from '../review/review.model'
import { Activity } from '../utils/services/activity/activity.model'

export class ShortBook {
	@ApiProperty({ example: 1, description: 'book id', type: Number })
	@IsNumber()
	id: number
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
	description: string
	@ApiProperty({
		example: 'picture',
		description: 'book picture',
		type: String
	})
	@IsString()
	picture: string
	@ApiProperty({ example: 100, description: 'book pages', type: Number })
	@IsNumber()
	pages: number
	@ApiProperty({ example: 100, description: 'book popularity', type: Number })
	@IsNumber()
	popularity: number
	@ApiProperty({ example: true, description: 'book visibility', type: Boolean })
	@IsBoolean()
	visible: boolean

	@ApiProperty({ type: [shortGenre] })
	@IsArray()
	@ValidateNested()
	@Type(() => shortGenre)
	genres: {
		id: number
		name: string
	}[]
}

export class AdminCatalogOutput {
	@ApiProperty({ type: [Book] })
	@IsArray()
	@ValidateNested()
	@Type(() => Book)
	data: Book[]
	@ApiProperty({ example: true, description: 'can load more', type: Boolean })
	@IsBoolean()
	canLoadMore: boolean
	@ApiProperty({ example: 1, description: 'total pages', type: Number })
	@IsNumber()
	totalPages: number
}

export class InfoByIdOutput extends ShortBook {
	@ApiProperty({
		example: 'description',
		description: 'book description',
		type: String
	})
	@IsString()
	description: string
	@ApiProperty({ type: [shortGenre] })
	@IsArray()
	@ValidateNested()
	@Type(() => shortGenre)
	genres: {
		id: number
		name: string
	}[]
}

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

export class AdminInfoByIdOutput extends ShortBook {
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

	@ApiProperty({ example: true, description: 'book visibility', type: Boolean })
	@IsBoolean()
	visible: boolean
	@ApiProperty({ example: 'ebook', description: 'book ebook', type: String })
	@IsString()
	ebook: string
	@ApiProperty({
		example: 'description',
		description: 'book description',
		type: String
	})
	@IsString()
	description: string
	@ApiProperty({ example: 100, description: 'book popularity', type: Number })
	@IsNumber()
	popularity: number
	@ApiProperty({ example: 100, description: 'book pages', type: Number })
	@IsNumber()
	pages: number
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
	_count: {
		finishedBy: number
		readingBy: number
		savedBy: number
	}
	@ApiProperty({
		type: [Review],
		description: 'book review'
	})
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => Review)
	review: Review[]

	@ApiProperty({ type: [shortGenre] })
	@IsArray()
	@ValidateNested()
	@Type(() => shortGenre)
	genres: {
		id: number
		name: string
	}[]
}

class ChapterChild {
	@ApiProperty({ example: 'name', description: 'chapter child name' })
	@IsString()
	name: string
	@ApiProperty({ example: 'link', description: 'chapter child link' })
	@IsString()
	link: string
}

class Chapter {
	@ApiProperty({ example: 'title', description: 'chapter title' })
	@IsString()
	title: string
	@ApiProperty({ type: [ChapterChild], description: 'chapter children' })
	@ValidateNested({ each: true })
	@Type(() => ChapterChild)
	children: ChapterChild[]
}

export class EbookByIdOutput {
	@IsString()
	@ApiProperty({ example: 'image.png', description: 'book cover' })
	picture: string
	@IsString()
	@ApiProperty({ example: 'title', description: 'book title' })
	title: string
	@ApiProperty({ type: [String], description: 'book file' })
	@IsArray()
	@IsString({ each: true })
	file: string[]
	@ApiProperty({ type: [Chapter], description: 'book chapters' })
	@ValidateNested({ each: true })
	@Type(() => Chapter)
	chapters: Chapter[]
}
