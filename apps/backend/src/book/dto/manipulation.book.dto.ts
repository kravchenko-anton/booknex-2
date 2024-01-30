import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator'
import type {
	BookPayload,
	BookUpdatePayload
} from '../../../../../libs/global/services-types/book-types'

export class CreateBookDto implements BookPayload {
	@IsString() title: string
	@IsString() author: string

	@IsString() description: string
	@IsString() picture: string
	@IsString() @IsOptional() ebook: string
	@IsNumber() pages: number
	@IsNumber() popularity: number
	@IsNumber({}, { each: true }) genres: number[]
}

export class EditBookDto implements Partial<BookUpdatePayload> {
	@IsString() @IsOptional() title: string
	@IsString() @IsOptional() author: string
	@IsBoolean() @IsOptional() visible: boolean
	@IsString() @IsOptional() description: string
	@IsString() @IsOptional() picture: string
	@IsString() @IsOptional() ebook: string
	@IsNumber() @IsOptional() pages: number
	@IsNumber() @IsOptional() likedPercentage: number
	@IsNumber() @IsOptional() popularity: number
	@IsNumber({}, { each: true }) @IsOptional() genres: number[]
}
