import { Body, Controller, Param, Post } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { Auth } from '../auth/decorators/auth.decorator'
import { CurrentUser } from '../auth/decorators/user.decorator'
import { ImpressionDto } from './impression.dto'
import { ImpressionService } from './impression.service'

@Controller('impression')
@ApiTags('⭐ impression')
@ApiBearerAuth()
export class ImpressionController {
	constructor(private readonly impressionsService: ImpressionService) {}

	@Post('/impression/:slug')
	@Auth()
	@ApiOkResponse({ description: 'Review book' })
	@ApiBody({
		type: ImpressionDto,
		required: true,
		description: 'Impression book'
	})
	async impression(
		@CurrentUser('id') userId: number,
		@Param('slug') bookSlug: string,
		@Body() dto: ImpressionDto
	) {
		return this.impressionsService.impression(+userId, bookSlug, dto)
	}
}
