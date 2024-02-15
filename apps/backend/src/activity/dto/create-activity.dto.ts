import { Activities } from '@prisma/client'
import { IsEnum, IsNumber, IsOptional, Max } from 'class-validator'

type allowedNumberType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

export class CreateActivityDto {
	@IsEnum(Activities)
	type: Activities

	@IsNumber()
	@Max(10)
	importance: allowedNumberType

	@IsNumber()
	@IsOptional()
	userId?: number

	@IsNumber()
	@IsOptional()
	bookId?: number

	@IsOptional()
	@IsNumber()
	collectionId?: number

	@IsNumber()
	@IsOptional()
	genreId?: number
}
