import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
	IsArray,
	IsBoolean,
	IsNumber,
	IsString,
	ValidateNested
} from 'class-validator'
import { shortGenre } from '../genre/genre.entity'
import { Activity } from '../utils/services/activity/activity.model'
import { Book, ShortBook } from './book.entity'

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

export class AdminInfoByIdOutput extends Book {
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
