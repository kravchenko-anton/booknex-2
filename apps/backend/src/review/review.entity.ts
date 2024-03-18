import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'

export class UserInReview {
	@ApiProperty({
		example: 1,
		description: 'user id'
	})
	@IsNumber()
	id: number

	@ApiProperty({
		example: 'email',
		description: 'user email'
	})
	@IsString()
	email: string
}

export class Review {
	@ApiProperty({
		example: 1,
		description: 'book-review id'
	})
	@IsNumber()
	id: number

	@ApiProperty({
		example: 'tags',
		description: 'book-review tags'
	})
	@IsString({ each: true })
	tags: string[]

	@ApiProperty({
		example: 'text',
		description: 'book-review text'
	})
	@IsString()
	text: string

	@ApiProperty({
		example: 1,
		description: 'book-review rating'
	})
	@IsNumber()
	rating: number
	//  TODO: пофиксить тут чтобы типы возвращали юзера и я мог его получить
	// @ApiProperty({
	// 	type: UserInReview,
	// 	description: 'book-review user'
	// })
	// @IsObject()
	// @Type(() => UserInReview)
	// user: UserInReview
}
