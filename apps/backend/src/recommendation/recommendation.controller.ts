import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from '../auth/decorators/auth.decorator';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { ShortGenre } from '../genre/genre.entity';
import { UpdateRecommendationDto } from './dto/update-recommendation.dto';
import { RecommendationService } from './recommendation.service';

@Controller('recommendation')
@ApiTags('📨 recommendation')
@ApiBearerAuth()
export class RecommendationController {
  constructor(private readonly recommendationService: RecommendationService) {}

  @Auth()
  @Post('/update-recommendation')
  @ApiOkResponse({ description: 'Recommendation updated' })
  @ApiBody({ type: UpdateRecommendationDto })
  async updateRecommendation(@CurrentUser('id') id: number, @Body() dto: UpdateRecommendationDto) {
    return this.recommendationService.updateRecommendation(+id, dto);
  }

  @Auth()
  @Get('/recommendation-genre')
  @ApiOkResponse({
    type: [ShortGenre],
    description: 'Recommendation genres'
  })
  async currentRecommendation(@CurrentUser('id') userId: number): Promise<
    | {
        id: number;
        name: string;
      }[]
    | null
  > {
    return this.recommendationService.currentRecommendation(+userId);
  }
}
