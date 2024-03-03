import { ApiProperty } from '@nestjs/swagger'
import { IsNumber } from 'class-validator'

export class UpdateGenreDto {
	@ApiProperty({
		description: 'Array of genres',
		example: [1, 2, 3],
		type: [Number],
		required: false
	})
	@IsNumber({}, { each: true })
	genres: number[]
}
