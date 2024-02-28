import { ApiProperty } from '@nestjs/swagger'
import { Role } from '@prisma/client'
import { Type } from 'class-transformer'
import {
	IsArray,
	IsBoolean,
	IsDate,
	IsEmail,
	IsEnum,
	IsNumber,
	IsOptional,
	IsString,
	ValidateNested
} from 'class-validator'
import { ShortBook } from '../book/book.model'
import { shortGenre } from '../genre/genre.model'
import { Activity } from '../utils/services/activity/activity.model'

export class User {
	@IsEnum(Role)
	@ApiProperty({ example: 'user', description: 'user role', enum: Role })
	role: keyof typeof Role

	@ApiProperty({ example: 1, description: 'user id' })
	@IsNumber()
	id: number

	@IsDate()
	@ApiProperty({ example: '2021-07-01', description: 'user created at' })
	createdAt: Date

	@IsString()
	@IsEmail()
	@ApiProperty({ example: 'email', description: 'user email' })
	email: string

	@IsOptional()
	@IsString()
	@ApiProperty({ example: 'socialId', description: 'user social id' })
	socialId?: string

	@IsOptional()
	@IsString()
	@ApiProperty({ example: 'password', description: 'user password' })
	password?: string

	@IsString()
	@ApiProperty({ example: 'picture', description: 'user picture' })
	picture: string

	@IsString()
	@ApiProperty({ example: 'fullName', description: 'user full name' })
	fullName: string
	@IsString()
	@ApiProperty({ example: 'location', description: 'user location' })
	location: string
}

export class UserLibrary {
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

export class UserProfile {
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

export class UserAdminCatalog {
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
