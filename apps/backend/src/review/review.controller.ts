import { Body, Controller, Param, Post } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { Auth } from '../auth/decorators/auth.decorator'
import { CurrentUser } from '../auth/decorators/user.decorator'
import { ReviewBookDto } from './dto/review.book.dto'
import { ReviewService } from './review.service'

@Controller('review')
@ApiTags('⭐ review')
@ApiBearerAuth()
export class ReviewController {
	constructor(private readonly reviewService: ReviewService) {}

	@Post('/review/:slug')
	@Auth()
	@ApiOkResponse({ description: 'Review book' })
	@ApiBody({ type: ReviewBookDto, required: true, description: 'Review book' })
	async review(
		@CurrentUser('id') userId: number,
		@Param('slug') bookSlug: string,
		@Body() dto: ReviewBookDto
	) {
		return this.reviewService.review(+userId, bookSlug, dto)
	}
}
