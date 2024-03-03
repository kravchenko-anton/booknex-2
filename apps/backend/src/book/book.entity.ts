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
