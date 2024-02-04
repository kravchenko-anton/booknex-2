import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'
import type { ParserDtoPayload } from '../../../../../libs/global/services-types/parser-types'

export class ParserDto implements ParserDtoPayload {
	@ApiProperty({
		example: 'https://www.goodreads.com/list/show/1.Best_Books_Ever',
		description: 'URL to parse',
		required: true
	})
	@IsString()
	readonly url: string

	@ApiProperty({
		example: 1,
		description: 'Page number to parse',
		required: true
	})
	@IsNumber()
	@ApiProperty()
	readonly page: number
}
