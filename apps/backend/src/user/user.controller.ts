import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query
} from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger'
import { Auth } from '../auth/decorators/auth.decorator'
import { CurrentUser } from '../auth/decorators/user.decorator'

import { UserUpdateSelectedGenresDto } from './dto/update-selected-genres.dto'
import { UserService } from './user.service'

@ApiBearerAuth()
@Controller('user')
@ApiTags('user')
export class UserController {
	constructor(private readonly usersService: UserService) {}
	@Auth()
	@Get('/profile')
	async profile(@CurrentUser('id') id: number) {
		return this.usersService.profile(+id)
	}

	@Auth()
	@Post('/update-recommendations')
	@ApiBody({ type: UserUpdateSelectedGenresDto })
	async updateRecommendations(
		@CurrentUser('id') id: number,
		@Body() dto: UserUpdateSelectedGenresDto
	) {
		return this.usersService.updateRecommendations(+id, dto)
	}

	@Auth()
	@Get('/recommendation-genres')
	async recommendationsGenres(@CurrentUser('id') userId: number): Promise<
		| {
				id: number
				name: string
		  }[]
		| null
	> {
		return this.usersService.recommendationGenres(+userId)
	}

	@Auth()
	@Get('/library')
	async library(@CurrentUser('id') id: number) {
		return this.usersService.library(+id)
	}

	@Auth()
	@Patch('/start-reading/:id')
	async toggle(@CurrentUser('id') userId: number, @Param('id') id: number) {
		return this.usersService.startReading(userId, +id)
	}

	@Auth()
	@Patch('/finish-reading/:id')
	async finishReading(
		@CurrentUser('id') userId: number,
		@Param('id') id: number
	) {
		return this.usersService.finishReading(userId, +id)
	}

	@Auth()
	@Patch('/toggle-save/:id')
	async toggleSave(@CurrentUser('id') userId: number, @Param('id') id: number) {
		return this.usersService.toggleSave(userId, +id)
	}

	@Auth()
	@Get('/is-saved/:id')
	async isSaved(@CurrentUser('id') userId: number, @Param('id') id: number) {
		return this.usersService.isSaved(userId, +id)
	}

	// admin
	@Auth('admin')
	@Get('admin/all')
	async all(
		@Query('searchTerm') searchTerm: string,
		@Query('page') page: number
	) {
		return this.usersService.all(searchTerm || '', page || 1)
	}

	@Auth('admin')
	@Delete('admin/remove/:id')
	async remove(@Param('id') id: number) {
		return this.usersService.remove(+id)
	}
}
