import { ApiProperty } from '@nestjs/swagger'
import { Activities } from '@prisma/client'
import {
	IsEnum,
	IsNumber,
	IsOptional,
	IsPositive,
	Max,
	Min
} from 'class-validator'

export class CreateActivityDto {
	@IsEnum(Activities)
	@ApiProperty({ enum: Activities, example: Activities.visitGenre })
	type: Activities

	@IsNumber()
	@Min(1)
	@ApiProperty({ example: 1, minimum: 1, type: 'number', required: true })
	@Max(10)
	importance: number

	@IsOptional()
	@IsNumber()
	@IsPositive()
	@ApiProperty({ example: 1, minimum: 1, type: 'number', required: false })
	userId?: number

	@IsOptional()
	@IsNumber()
	@IsPositive()
	@ApiProperty({ example: 1, minimum: 1, type: 'number', required: false })
	bookId?: number

	@IsOptional()
	@IsNumber()
	@IsPositive()
	@ApiProperty({ example: 1, minimum: 1, type: 'number', required: false })
	genreId?: number
}
