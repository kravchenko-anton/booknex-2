import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, MinLength } from 'class-validator'

export class UserUpdateSelectedGenresDto {
	@ApiProperty({
		example: [1, 2, 3],
		description: 'Array of selected genres',
		required: true
	})
	@IsNumber({}, { each: true })
	@MinLength(1, {
		message: 'At least one genre should be selected'
	})
	selectedGenres: number[]
}
