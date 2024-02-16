import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsOptional, IsString } from 'class-validator'
import type { ReviewBookPayload } from '../../../../../libs/global/services-types/book-types'
import { reviewTags } from '../review-tags'

export class ReviewBookDto implements ReviewBookPayload {
	@ApiProperty({
		example: 5,
		description: 'Rating of the book',
		required: true
	})
	@IsNumber()
	rating: number

	@ApiProperty({
		example: reviewTags.positive.map(tag => tag.name),
		description: 'Tags for the book',
		required: false
	})
	@IsString({ each: true })
	tags: string[]

	@ApiProperty({
		example: 'Good book with a lot of useful information',
		description: 'Comment for the book',
		required: false
	})
	@IsString()
	@IsOptional()
	comment: string
}
