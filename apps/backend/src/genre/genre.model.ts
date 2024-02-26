import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator'
import { ShortBook } from '../book/book.model'

export class shortGenre {
	@ApiProperty({ example: 1, description: 'genre id' })
	@IsNumber()
	id: number

	@ApiProperty({ example: 'name', description: 'genre name' })
	@IsString()
	name: string
}

export class Genre extends shortGenre {
	@ApiProperty({ example: 'description', description: 'genre description' })
	@IsString()
	description: string

	@ApiProperty({ example: '2021-07-01', description: 'genre created at' })
	@IsString()
	createdAt: string

	@ApiProperty({ example: '2021-07-01', description: 'genre updated at' })
	@IsString()
	updatedAt: string
}

export class byIdOutput extends shortGenre {
	@ApiProperty({ type: [ShortBook] })
	@IsArray()
	@ValidateNested()
	@Type(() => ShortBook)
	majorBooks: ShortBook[]
}
