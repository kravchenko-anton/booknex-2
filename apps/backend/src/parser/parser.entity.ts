import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator'
import { ShortGenre } from '../genre/genre.entity'

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
		description: 'rating of the book'
	})
	@IsNumber()
	rating: number
	@ApiProperty({ type: [ShortGenre] })
	@IsArray()
	@ValidateNested()
	@Type(() => ShortGenre)
	genres: {
		id: number
		name: string
	}[]
}
