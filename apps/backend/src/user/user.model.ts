import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
	IsArray,
	IsBoolean,
	IsNumber,
	IsString,
	ValidateNested
} from 'class-validator'
import { ShortBook } from '../book/book.entity'
import { shortGenre } from '../genre/genre.entity'
import { Activity } from '../utils/services/activity/activity.model'
import { User } from './user.entity'

export class UserLibraryOutput {
	@IsArray()
	@ValidateNested({ each: true })
	@ApiProperty({ type: [ShortBook] })
	@Type(() => ShortBook)
	readingBooks: ShortBook[]

	@IsArray()
	@ApiProperty({ type: [ShortBook] })
	@ValidateNested({ each: true })
	@Type(() => ShortBook)
	finishedBooks: ShortBook[]

	@IsArray()
	@ApiProperty({ type: [ShortBook] })
	@ValidateNested({ each: true })
	@Type(() => ShortBook)
	savedBooks: ShortBook[]
}

export class UserProfileOutput {
	@IsNumber()
	@ApiProperty({ example: 1, type: Number })
	id: number

	@IsString()
	@ApiProperty({ example: 'email', type: String })
	email: string

	@IsNumber()
	@ApiProperty({ example: 1, type: Number })
	bookCount: number

	@IsNumber()
	@ApiProperty({ example: 1, type: Number })
	totalPageCount: number
}

export class UserCountOutput {
	@IsNumber()
	@ApiProperty({ example: 1, type: Number })
	savedBooks: number

	@IsNumber()
	@ApiProperty({ example: 1, type: Number })
	finishedBooks: number

	@IsNumber()
	@ApiProperty({ example: 1, type: Number })
	readingBooks: number
}

export class CatalogUserOutput extends User {
	@ApiProperty({ type: [shortGenre] })
	@IsArray()
	@ValidateNested()
	@Type(() => shortGenre)
	selectedGenres: {
		id: number
		name: string
	}[]

	@IsArray()
	@ApiProperty({ type: [Activity] })
	@ValidateNested({ each: true })
	@Type(() => Activity)
	activities: Activity[]

	@ApiProperty({
		type: UserCountOutput,
		description: 'Count of books finished, reading and saved by the user'
	})
	@ValidateNested()
	@Type(() => UserCountOutput)
	_count: {
		savedBooks: number
		finishedBooks: number
		readingBooks: number
	}
}

export class UserAdminCatalogOutput {
	@IsArray()
	@ApiProperty({ type: [CatalogUserOutput] })
	@ValidateNested({ each: true })
	@Type(() => CatalogUserOutput)
	data: CatalogUserOutput[]

	@IsBoolean()
	@ApiProperty({ example: true, type: Boolean })
	canLoadMore: boolean

	@IsNumber()
	@ApiProperty({ example: 1, type: Number })
	totalPages: number
}
