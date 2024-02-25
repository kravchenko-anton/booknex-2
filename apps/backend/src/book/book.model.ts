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
	@IsNumber()
	@ApiProperty({ example: 1, description: 'book id' })
	id: number
	@IsString()
	@ApiProperty({ example: 'title', description: 'book title' })
	title: string
	@IsString()
	@ApiProperty({ example: 'picture', description: 'book picture' })
	picture: string

	@IsString()
	@ApiProperty({ example: 'author', description: 'book author' })
	author: string
}

export class Book extends ShortBook {
	@IsString()
	@ApiProperty({ example: 'description', description: 'book description' })
	description: string
	@IsString()
	@ApiProperty({ example: 'picture', description: 'book picture' })
	picture: string
	@IsString()
	@IsNumber()
	@ApiProperty({ example: 100, description: 'book pages' })
	pages: number
	@IsNumber()
	@ApiProperty({ example: 100, description: 'book popularity' })
	popularity: number
	@IsBoolean()
	@ApiProperty({ example: true, description: 'book visibility' })
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
	@ApiProperty({ example: true })
	@IsBoolean()
	canLoadMore: boolean
	@ApiProperty({ example: 1 })
	@IsNumber()
	totalPages: number
}

export class InfoByIdOutput extends ShortBook {
	@ApiProperty({ example: 'description', description: 'book description' })
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
	@ApiProperty({ example: 1, description: 'FinishedBy' })
	@IsNumber()
	finishedBy: number

	@ApiProperty({ example: 1, description: 'ReadingBy' })
	@IsNumber()
	readingBy: number

	@ApiProperty({ example: 1, description: 'SavedBy' })
	@IsNumber()
	savedBy: number
}

export class AdminInfoByIdOutput extends ShortBook {
	@ApiProperty({ example: '2021-07-01', description: 'book created at' })
	@IsString()
	createdAt: Date

	@ApiProperty({ example: '2021-07-01', description: 'book updated at' })
	@IsString()
	updatedAt: Date

	@ApiProperty({ example: true, description: 'book visibility' })
	@IsBoolean()
	visible: boolean
	@ApiProperty({ example: 'ebook', description: 'book ebook' })
	@IsString()
	ebook: string
	@ApiProperty({ example: 'description', description: 'book description' })
	@IsString()
	description: string
	@ApiProperty({ example: 100, description: 'book popularity' })
	@IsNumber()
	popularity: number
	@ApiProperty({ example: 100, description: 'book pages' })
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
