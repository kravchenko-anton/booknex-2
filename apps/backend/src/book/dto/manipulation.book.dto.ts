import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
	ArrayMinSize,
	IsArray,
	IsBoolean,
	IsNumber,
	IsOptional,
	IsString,
	ValidateNested
} from 'class-validator'
import 'multer'
import { EBookType } from './update.ebook.dto'

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
	@IsString()
	pages: number

	@ApiProperty({
		description: 'Number of goodRead reviews',
		example: 1_000_000,
		required: true
	})
	@IsString()
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

	@ApiProperty({ type: String })
	@IsString()
	picture: string
}

export class EditBookDto {
	@ApiProperty({ type: String, required: false })
	@IsString()
	@IsOptional()
	picture?: string
	@ApiProperty({
		description: 'Title of the book',
		example: 'The Great Gatsby',
		required: false
	})
	@IsString()
	@IsOptional()
	title?: string
	@ApiProperty({
		description: 'Author of the book',
		example: 'F. Scott Fitzgerald',
		required: false
	})
	@IsString()
	@IsOptional()
	author?: string
	@ApiProperty({
		description: 'Uploaded picture',
		example: 'picture.jpg',
		required: false
	})
	@IsString()
	@IsOptional()
	description?: string
	@ApiProperty({
		description: 'Number of pages in the book',
		example: 300,
		required: false
	})
	@IsOptional()
	@IsNumber()
	pages?: number

	@ApiProperty({
		description: 'Is book visible',
		example: true,
		required: false
	})
	@IsOptional()
	@IsBoolean()
	visible?: boolean
	@ApiProperty({
		description: 'Number of goodRead reviews',
		example: 1_000_000,
		required: false
	})
	@IsOptional()
	@IsNumber()
	popularity?: number
}

export class UpdateGenreDto {
	@ApiProperty({
		description: 'Array of genres',
		example: [1, 2, 3],
		type: [Number],
		required: false
	})
	@IsNumber({}, { each: true })
	genres: number[]
}
