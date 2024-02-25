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

export class BookTemplate {
	@ApiProperty({
		type: Number,
		description: 'id of the book'
	})
	@IsNumber()
	id: number

	@ApiProperty({
		type: String,
		description: 'title of the book'
	})
	@IsString()
	title: string
	@ApiProperty({
		type: String,
		description: 'author of the book'
	})
	@IsString()
	author: string
	@ApiProperty({
		type: String,
		description: 'description of the book'
	})
	@IsString()
	description: string
	@ApiProperty({
		type: String,
		description: 'picture of the book'
	})
	@IsString()
	picture: string
	@ApiProperty({
		type: Number,
		description: 'pages of the book'
	})
	@IsNumber()
	pages: number
	@ApiProperty({
		type: Number,
		description: 'popularity of the book'
	})
	@IsNumber()
	popularity: number

	@ApiProperty({ type: [shortGenre] })
	@IsArray()
	@ValidateNested()
	@Type(() => shortGenre)
	genres: {
		id: number
		name: string
	}[]
}

export class UnfoldOutput {
	@ApiProperty({
		type: Number,
		description: 'id of the chapter'
	})
	@IsNumber()
	id: number

	@ApiProperty({
		type: String,
		description: 'name of the chapter'
	})
	@IsString()
	name: string

	@ApiProperty({
		type: String,
		description: 'text of the chapter'
	})
	@IsString()
	text: string
}

export class BookTemplateCatalogOutput {
	@IsArray()
	@ApiProperty({
		type: [BookTemplate],
		description: 'book template'
	})
	@ValidateNested({ each: true })
	@Type(() => BookTemplate)
	data: BookTemplate[]

	@IsBoolean()
	@ApiProperty({
		type: Boolean,
		description: 'can load more'
	})
	canLoadMore: boolean

	@IsNumber()
	@ApiProperty({
		type: Number,
		description: 'total pages'
	})
	totalPages: number
}
