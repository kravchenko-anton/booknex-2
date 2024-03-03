import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator'
import type { UpdateBookDto as UpdateBookType } from '../../api-client/models/update-book-dto'

export class UpdateBookDto implements Partial<UpdateBookType> {
	@IsString()
	@IsOptional()
	picture?: string

	@IsString()
	@IsOptional()
	title?: string

	@IsString()
	@IsOptional()
	author?: string

	@IsString()
	@IsOptional()
	description?: string

	@IsOptional()
	@IsNumber()
	pages?: number

	@IsOptional()
	@IsBoolean()
	visible?: boolean

	@IsOptional()
	@IsNumber()
	popularity?: number
}
