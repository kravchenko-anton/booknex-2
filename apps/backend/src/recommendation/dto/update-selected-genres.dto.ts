import { ApiProperty } from '@nestjs/swagger'
import { ArrayMinSize, IsArray, IsInt, Min } from 'class-validator'

export class UserUpdateSelectedGenresDto {
	@IsArray()
	@ArrayMinSize(1)
	@ApiProperty({ type: [Number], description: 'selected genres' })
	@IsInt({ each: true })
	@Min(1, { each: true })
	selectedGenres: number[]
}
