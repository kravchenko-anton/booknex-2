import { IsString } from 'class-validator'
import type { ReviewBookPayload } from '../../../../../libs/global/services-types/book-types'

export class ReviewBookDto implements ReviewBookPayload {
	@IsString()
	emotion: string

	@IsString({ each: true })
	tags: string[]

	@IsString()
	comment: string
}
