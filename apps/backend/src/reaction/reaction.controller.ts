import { Auth } from '@/src/auth/decorators/auth.decorator'
import { CurrentUser } from '@/src/auth/decorators/user.decorator'
import {
	CreateReaction,
	ReactionByBookOutput,
	ReactionListOutput
} from '@/src/reaction/reaction.dto'
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { ReactionService } from './reaction.service'

@ApiBearerAuth()
@Controller('reaction')
@ApiTags('👍 Reaction')
export class ReactionController {
	constructor(private readonly reactionService: ReactionService) {}

	@Auth()
	@Post('/create')
	@ApiBody({ type: CreateReaction })
	create(@CurrentUser('id') userId: number, @Body() dto: CreateReaction) {
		return this.reactionService.create(userId, dto)
	}

	@Auth()
	@Get('/reaction-list')
	@ApiOkResponse({ type: [ReactionListOutput] })
	reactionList(
		@CurrentUser('id') userId: number
	): Promise<ReactionListOutput[]> {
		return this.reactionService.reactionList(userId)
	}

	@Auth()
	@Get('/reaction-by-book/:bookSlug')
	@ApiOkResponse({ type: ReactionByBookOutput, isArray: true })
	reactionByBook(
		@Param('bookSlug') bookSlug: string,
		@CurrentUser('id') userId: number
	): Promise<ReactionByBookOutput[]> {
		return this.reactionService.reactionByBook(bookSlug, userId)
	}

	@Auth()
	@Delete('/delete/:id')
	remove(@Param('id') id: string, @CurrentUser('id') userId: number) {
		return this.reactionService.remove(+id, userId)
	}
}
