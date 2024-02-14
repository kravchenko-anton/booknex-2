import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsOptional, IsString } from 'class-validator'
import type { FeedbackBookPayload } from '../../../../../libs/global/services-types/book-types'
import { feedbackTags } from '../feedback-tags'

export class FeedbackBookDto implements FeedbackBookPayload {
	@ApiProperty({
		example: 5,
		description: 'Rating of the book',
		required: true
	})
	@IsNumber()
	rating: number

	@ApiProperty({
		example: feedbackTags.positive.map(tag => tag.name),
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
