import { ApiProperty } from '@nestjs/swagger'
import { ArrayMinSize, IsArray, IsInt, Min } from 'class-validator'

export class UpdateRecommendationDto {
	@IsArray()
	@ArrayMinSize(1)
	@ApiProperty({ type: [String], description: 'new genres for recommendation' })
	@IsInt({ each: true })
	@Min(1, { each: true })
	genres: string[]
}
