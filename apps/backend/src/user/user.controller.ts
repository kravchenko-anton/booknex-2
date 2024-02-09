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
import {
	ApiBearerAuth,
	ApiBody,
	ApiParam,
	ApiQuery,
	ApiTags
} from '@nestjs/swagger'
import type {
	AllUsersOutput,
	UserLibraryOutput,
	UserProfileOutput
} from '../../../../libs/global/services-types/user-types'

import { Auth } from '../decorator/auth.decorator'
import { CurrentUser } from '../decorator/user.decorator'
import { UserUpdateSelectedGenresDto } from './dto'
import { UserService } from './user.service'

@ApiBearerAuth()
@Controller('user')
@ApiTags('user')
export class UserController {
	constructor(private readonly usersService: UserService) {}
	@Auth()
	@Get('/profile')
	async profile(@CurrentUser('id') id: number): Promise<UserProfileOutput> {
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
	@Get('/library')
	async library(@CurrentUser('id') id: number): Promise<UserLibraryOutput> {
		return this.usersService.library(+id)
	}

	@Auth()
	@Patch('/start-reading/:id')
	@ApiParam({ name: 'id', required: false, example: 1 })
	async toggle(@CurrentUser('id') userId: number, @Param('id') id: string) {
		return this.usersService.startReading(userId, +id)
	}

	@Auth()
	@Patch('/finish-reading/:id')
	@ApiParam({ name: 'id', required: false, example: 1 })
	async finishReading(
		@CurrentUser('id') userId: number,
		@Param('id') id: string
	) {
		return this.usersService.finishReading(userId, +id)
	}

	@Auth()
	@Patch('/toggle-save/:id')
	@ApiParam({ name: 'id', required: false, example: 1 })
	async toggleSave(@CurrentUser('id') userId: number, @Param('id') id: string) {
		return this.usersService.toggleSave(userId, +id)
	}

	@Auth()
	@Get('/is-saved/:id')
	@ApiParam({ name: 'id', required: false, example: 1 })
	async isSaved(@CurrentUser('id') userId: number, @Param('id') id: string) {
		return this.usersService.isSaved(userId, +id)
	}

	// admin
	@Auth('admin')
	@Get('admin/all')
	@ApiQuery({ name: 'searchTerm', required: false, example: '' })
	@ApiQuery({ name: 'page', required: false, example: 1 })
	// remove in swagger api/user and stay only admin/all
	async all(
		@Query('searchTerm') searchTerm: string,
		@Query('page') page: number
	): Promise<AllUsersOutput> {
		return this.usersService.all(searchTerm || '', page || 1)
	}

	@Auth('admin')
	@Delete('admin/delete/:id')
	@ApiParam({ name: 'id', required: false, example: 1 })
	async delete(@Param('id') id: string) {
		return this.usersService.delete(+id)
	}
}
