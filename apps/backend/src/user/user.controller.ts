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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import type {
	AllUsersOutput,
	UserLibraryOutput,
	UserProfileOutput
} from '../../../../libs/global/services-types/user-types'

import { Auth } from '../decorator/auth.decorator'
import { CurrentUser } from '../decorator/user.decorator'
import type { UserService } from './user.service'
import type {
	UserUpdatePasswordDto,
	UserUpdateSelectedGenresDto
} from './user.update.dto'

@ApiTags('user')
@ApiBearerAuth()
@Controller('user')
export class UserController {
	constructor(private readonly usersService: UserService) {}
	@Auth()
	@Get('/profile')
	async profile(@CurrentUser('id') id: number): Promise<UserProfileOutput> {
		return this.usersService.profile(+id)
	}

	@Auth()
	@Get('/update-recommendations')
	async updateRecommendations(
		@CurrentUser('id') id: number,
		@Body() dto: UserUpdateSelectedGenresDto
	) {
		return this.usersService.updateRecommendations(+id, dto)
	}

	@Auth()
	@Get('/library')
	async library(@CurrentUser('id') id: number): Promise<UserLibraryOutput> {
		return this.usersService.library(+id)
	}

	@Auth()
	@Post('/update-password')
	async updatePassword(
		@CurrentUser('id') id: number,
		@Body() dto: UserUpdatePasswordDto
	) {
		return this.usersService.updatePassword(+id, dto)
	}

	@Auth()
	@Patch('/start-reading/:id')
	async toggle(@CurrentUser('id') userId: number, @Param('id') id: string) {
		return this.usersService.startReading(userId, +id)
	}

	@Auth()
	@Patch('/finish-reading/:id')
	async finishReading(
		@CurrentUser('id') userId: number,
		@Param('id') id: string
	) {
		return this.usersService.finishReading(userId, +id)
	}

	@Auth()
	@Patch('/toggle-save/:id')
	async toggleSave(@CurrentUser('id') userId: number, @Param('id') id: string) {
		return this.usersService.toggleSave(userId, +id)
	}

	@Auth()
	@Get('/is-saved/:id')
	async isSaved(@CurrentUser('id') userId: number, @Param('id') id: string) {
		return this.usersService.isSaved(userId, +id)
	}

	// admin
	@Auth('admin')
	@Get('admin/all')
	async all(
		@Query('searchTerm') searchTerm: string,
		@Query('page') page: number
	): Promise<AllUsersOutput> {
		return this.usersService.all(searchTerm, page || 1)
	}

	@Auth('admin')
	@Delete('admin/delete/:id')
	async delete(@Param('id') id: string) {
		return this.usersService.delete(+id)
	}
}
