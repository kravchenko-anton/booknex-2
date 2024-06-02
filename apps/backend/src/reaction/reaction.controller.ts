import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post
} from '@nestjs/common'
import { ReactionService } from './reaction.service'

@Controller('reaction')
export class ReactionController {
	constructor(private readonly reactionService: ReactionService) {}

	@Post()
	create(@Body() createReactionDto: any) {
		return this.reactionService.create(createReactionDto)
	}

	@Get()
	findAll() {
		return this.reactionService.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.reactionService.findOne(+id)
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateReactionDto: any) {
		return this.reactionService.update(+id, updateReactionDto)
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.reactionService.remove(+id)
	}
}
