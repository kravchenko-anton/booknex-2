import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator'
import type { BookPayload } from '../../../../../libs/global/services-types/book-types'

export class CreateBookDto implements BookPayload {
	@IsString() title: string
	@IsString() author: string

	@IsString() description: string
	@IsString() picture: string
	@IsString() @IsOptional() file: string
	@IsObject({ each: true }) @IsOptional() chapters: {
		name: string
		children: { name: string; link: string }[]
	}[]

	@IsNumber() pages: number
	@IsNumber() popularity: number
	@IsNumber({}, { each: true }) genres: number[]
}

export class EditBookDto implements Partial<BookPayload> {
	@IsString() title: string
	@IsString() @IsOptional() author: string

	@IsString() @IsOptional() description: string
	@IsString() @IsOptional() picture: string
	@IsString() @IsOptional() file: string
	@IsNumber() @IsOptional() pages: number
	@IsObject({ each: true }) @IsOptional() chapters: {
		name: string
		children: { name: string; link: string }[]
	}[]

	@IsNumber() @IsOptional() likedPercentage: number
	@IsNumber() @IsOptional() popularity: number
	@IsNumber({}, { each: true }) @IsOptional() genres: number[]
}
