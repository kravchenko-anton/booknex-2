import { IsNumber, IsOptional, IsString } from 'class-validator'
import type { FeedbackBookPayload } from '../../../../../libs/global/services-types/book-types'

export class FeedbackBookDto implements FeedbackBookPayload {
	@IsNumber()
	rating: number

	@IsString({ each: true })
	@IsOptional()
	tags: string[]

	@IsString()
	@IsOptional()
	comment: string
}
