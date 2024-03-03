import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
	IsArray,
	IsBoolean,
	IsNumber,
	IsString,
	ValidateNested
} from 'class-validator'
import { BookTemplate } from './parser.entity'

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
