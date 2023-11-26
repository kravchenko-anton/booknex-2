import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator'
import type { BookPayload } from '../../../../../libs/services/book/book-types'


export class CreateBookDto implements BookPayload {
	@IsString() title: string
	@IsObject()
	author: {
		name: string
	}

	@IsString() description: string
	@IsString() picture: string
	@IsString() @IsOptional() file: string
	@IsNumber() @IsOptional() charapters: {
		name: string
		link: string
	}[]

	@IsNumber() pages: number
	@IsNumber() likedPercentage: number
	@IsNumber() popularity: number
	@IsString() majorGenre: string
	@IsString({ each: true }) genres: string[]
}
export class EditBookDto implements Partial<BookPayload>  {
	@IsString() @IsOptional() title: string
	@IsString() @IsOptional() author: {
		name: string
	}

	@IsString() @IsOptional() description: string
	@IsString() @IsOptional() picture: string
	@IsString() @IsOptional() file: string
	@IsNumber() @IsOptional() pages: number
	@IsNumber() @IsOptional() charapters: {
		name: string
		link: string
	}[]

	@IsNumber() @IsOptional() likedPercentage: number
	@IsNumber() @IsOptional() popularity: number
	@IsString() @IsOptional() majorGenre: string
	@IsString({ each: true }) @IsOptional() genres: string[]
}
