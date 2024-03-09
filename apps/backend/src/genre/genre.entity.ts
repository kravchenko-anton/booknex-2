import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'

export class shortGenre {
	@ApiProperty({ example: 1, description: 'genre id', type: Number })
	@IsNumber()
	id: number

	@ApiProperty({ example: 'name', description: 'genre name', type: String })
	@IsString()
	name: string
}

export class Genre extends shortGenre {
	@ApiProperty({
		example: '2021-07-01',
		description: 'genre created at',
		type: String
	})
	@IsString()
	createdAt: string

	@ApiProperty({
		example: '2021-07-01',
		description: 'genre updated at',
		type: String
	})
	@IsString()
	updatedAt: string

	@ApiProperty({
		example: 'description',
		description: 'genre description',
		type: String
	})
	@IsString()
	description: string
}
