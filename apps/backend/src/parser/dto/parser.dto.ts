import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'
import type { ParserDtoPayload } from '../../../../../libs/global/services-types/parser-types'

export class ParserDto implements ParserDtoPayload {
	@IsString()
	@ApiProperty()
	readonly url: string

	@IsNumber()
	@ApiProperty()
	readonly page: number
}
