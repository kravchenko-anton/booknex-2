import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateBookDto {
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
