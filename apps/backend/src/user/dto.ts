import { ApiProperty } from '@nestjs/swagger'
import { ArrayMinSize, IsNumber } from 'class-validator'

export class UserUpdateSelectedGenresDto {
	@ApiProperty({
		example: [1, 2, 3],
		description: 'Array of selected genres',
		required: true
	})
	@ArrayMinSize(3, {
		message: 'The array must contain at least  3 numbers'
	})
	@IsNumber({}, { each: true })
	selectedGenres: number[]
}
