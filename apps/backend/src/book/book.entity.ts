import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
	ArrayMinSize,
	IsArray,
	IsBoolean,
	IsNumber,
	IsString,
	Max,
	Min,
	ValidateNested
} from 'class-validator'
import { shortGenre } from '../genre/genre.entity'

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

	@ApiProperty({ example: 100, description: 'book readingTime', type: Number })
	@IsNumber()
	readingTime: number

	@ApiProperty({
		example: 100,
		description: 'book chapters count',
		type: Number
	})
	@IsNumber()
	chapters: number

	@ApiProperty({ example: 5, description: 'book rating', type: Number })
	@IsNumber()
	@Min(1)
	@Max(5)
	rating: number

	@ApiProperty({ example: true, description: 'book visibility', type: Boolean })
	@IsBoolean()
	visible: boolean

	@ApiProperty({ type: [shortGenre] })
	@IsArray()
	@ArrayMinSize(1)
	@ValidateNested()
	@Type(() => shortGenre)
	genres: {
		id: number
		name: string
	}[]
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
}
