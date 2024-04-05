import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class ShortGenre {
	@ApiProperty({ example: 1, description: 'genre slug', type: String })
	@IsString()
	slug: string

	@ApiProperty({ example: 'name', description: 'genre name', type: String })
	@IsString()
	name: string

	@ApiProperty({ example: 'icon', description: 'genre icon', type: String })
	@IsString()
	icon: string
}

export class Genre extends ShortGenre {
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
