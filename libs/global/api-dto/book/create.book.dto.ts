import {
	ArrayMinSize,
	IsArray,
	IsNotEmpty,
	IsNumber,
	IsString,
	ValidateNested
} from 'class-validator'
import type { CreateBookDto as CreateBookType } from '../../api-client/models/create-book-dto'
import type { EBookTypeDto } from './ebook.dto'

export class CreateBookDto implements Omit<CreateBookType, 'picture'> {
	@IsString()
	title: string
	@IsString()
	author: string
	@IsString()
	description: string

	@IsArray()
	@ValidateNested()
	ebook: EBookTypeDto[]

	@IsString()
	pages: number

	@IsString()
	popularity: number

	@IsArray()
	@ArrayMinSize(1)
	@IsNumber({}, { each: true })
	genres: number[]

	@IsNotEmpty()
	picture: File
}
