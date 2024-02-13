import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator'
import type {
	BookPayload,
	BookUpdatePayload
} from '../../../../../libs/global/services-types/book-types'

export class CreateBookDto implements BookPayload {
	@ApiProperty({
		example: 'The Great Gatsby',
		description: 'Title of the book',
		required: true
	})
	@IsString()
	title: string

	@ApiProperty({
		example: 'F. Scott Fitzgerald',
		description: 'Author of the book',
		required: true
	})
	@IsString()
	author: string

	@ApiProperty({
		// description
		example:
			"The Great Gatsby is a novel by the American author F. Scott Fitzgerald. First published in 1925, it is set on Long Island's North Shore and in New York City from spring to autumn of 1922.",
		description: 'Description of the book',
		required: true
	})
	@IsString()
	description: string

	@ApiProperty({
		description: 'Uploaded picture',
		required: true
	})
	@IsString()
	picture: string

	@ApiProperty({
		description: 'Uploaded ebook',
		required: true
	})
	@IsString()
	@IsOptional()
	ebook: string

	@ApiProperty({
		example: 300,
		description: 'Number of pages in the book',
		required: true
	})
	@IsNumber()
	pages: number

	@ApiProperty({
		example: 1_000_000,
		description: 'Number of goodRead reviews',
		required: true
	})
	@IsNumber()
	popularity: number

	@ApiProperty({
		example: [1, 2, 3],
		description: 'Array of genres',
		required: true
	})
	@IsNumber({}, { each: true })
	genres: number[]
}

export class EditBookDto implements Partial<BookUpdatePayload> {
	@ApiProperty({
		example: 'The Great Gatsby',
		description: 'Title of the book',
		required: false
	})
	@IsString()
	@IsOptional()
	title: string

	@ApiProperty({
		example: 'F. Scott Fitzgerald',
		description: 'Author of the book',
		required: false
	})
	@IsString()
	@IsOptional()
	author: string

	@ApiProperty({
		example: true,
		description: 'Visibility of the book',
		required: false
	})
	@IsBoolean()
	@IsOptional()
	visible: boolean
	@ApiProperty({
		example:
			"The Great Gatsby is a novel by the American author F. Scott Fitzgerald. First published in 1925, it is set on Long Island's North Shore and in New York City from spring to autumn of 1922.",
		description: 'Description of the book',
		required: false
	})
	@IsString()
	@IsOptional()
	description: string

	@ApiProperty({
		description: 'Uploaded picture',
		required: false
	})
	@IsString()
	@IsOptional()
	picture: string

	@ApiProperty({
		description: 'Uploaded ebook',
		required: false
	})
	@IsString()
	@IsOptional()
	ebook: string

	@ApiProperty({
		example: 300,
		description: 'Number of pages in the book',
		required: false
	})
	@IsNumber()
	@IsOptional()
	pages: number

	@ApiProperty({
		example: 800_424,
		description: 'Number of goodRead reviews',
		required: false
	})
	@IsNumber()
	@IsOptional()
	popularity: number

	@ApiProperty({
		example: [1, 2, 3],
		description: 'Array of genres',
		required: false
	})
	@IsNumber({}, { each: true })
	@IsOptional()
	genres: number[]
}
