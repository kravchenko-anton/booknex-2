import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString, MaxLength, Min, MinLength } from 'class-validator'

export class ParserDto {
	@ApiProperty({
		type: String,
		description: 'url of the parser'
	})
	@IsString()
	@MinLength(1)
	@MaxLength(255)
	url: string

	@IsNumber()
	@ApiProperty({
		type: Number,
		description: 'page of the parser'
	})
	@Min(0)
	page: number
}
