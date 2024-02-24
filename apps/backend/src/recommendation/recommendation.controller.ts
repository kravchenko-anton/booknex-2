import { Body, Controller, Get, Post } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { Auth } from '../auth/decorators/auth.decorator'
import { CurrentUser } from '../auth/decorators/user.decorator'
import { UserUpdateSelectedGenresDto } from '../user/dto/update-selected-genres.dto'
import { RecommendationService } from './recommendation.service'

@Controller('recommendation')
@ApiTags('recommendation')
@ApiBearerAuth()
export class RecommendationController {
	constructor(private readonly recommendationService: RecommendationService) {}

	@Auth()
	@Post('/update-recommendations')
	@ApiOkResponse({ description: 'Recommendations updated' })
	@ApiBody({ type: UserUpdateSelectedGenresDto })
	async updateRecommendations(
		@CurrentUser('id') id: number,
		@Body() dto: UserUpdateSelectedGenresDto
	) {
		return this.recommendationService.updateRecommendations(+id, dto)
	}

	@Auth()
	@Get('/recommendation-genres')
	@ApiOkResponse({
		type: [String],
		isArray: true,
		description: 'Recommendation genres'
	})
	async recommendationsGenres(@CurrentUser('id') userId: number): Promise<
		| {
				id: number
				name: string
		  }[]
		| null
	> {
		return this.recommendationService.recommendationGenres(+userId)
	}
}
