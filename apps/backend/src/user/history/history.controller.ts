import { Auth } from '@/src/auth/decorators/auth.decorator'
import { CurrentUser } from '@/src/auth/decorators/user.decorator'
import { History } from '@/src/user/history/history.model'
import { Body, Controller, Post } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { HistoryService } from './history.service'

@Controller('history')
@Auth()
@ApiTags('📚 history')
export class HistoryController {
	constructor(private readonly historyService: HistoryService) {}

	@Post('/sync')
	@ApiOkResponse({ type: History })
	async sync(@CurrentUser('id') userId: number, @Body() body: History) {
		return this.historyService.sync(body, userId)
	}
}
