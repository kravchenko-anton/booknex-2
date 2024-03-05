import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
	ArrayMinSize,
	IsArray,
	IsNumber,
	IsString,
	ValidateNested
} from 'class-validator'
import { EBookType } from '../book.entity'

export class CreateBookDto {
	@ApiProperty({
		description: 'Title of the book',
		example: 'The Great Gatsby',
		required: true
	})
	@IsString()
	title: string
	@ApiProperty({
		description: 'Author of the book',
		example: 'F. Scott Fitzgerald',
		required: true
	})
	@IsString()
	author: string
	@ApiProperty({
		description: 'Description of the book',
		example:
			"The Great Gatsby is a novel by the American author F. Scott Fitzgerald. First published in 1925, it is set on Long Island's North Shore and in New York City from spring to autumn of 1922.",
		required: true
	})
	@IsString()
	description: string

	@ApiProperty({ type: [EBookType] })
	@IsArray()
	@ValidateNested()
	@Type(() => EBookType)
	ebook: EBookType[]
	@ApiProperty({
		description: 'Number of pages in the book',
		example: 300,
		required: true
	})
	@IsNumber()
	pages: number

	@ApiProperty({
		description: 'Number of goodRead reviews',
		example: 1_000_000,
		required: true
	})
	@IsNumber()
	popularity: number

	@IsArray()
	@ArrayMinSize(1)
	@ApiProperty({
		description: 'Array of genres',
		example: [1, 2, 3],
		type: [Number],
		required: true
	})
	@IsNumber({}, { each: true })
	genres: number[]

	@ApiProperty({ type: String, required: true })
	picture: string
}
