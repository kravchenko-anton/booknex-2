import type {
	AllUsersOutput,
	FavoriteListOutput,
	UserLibraryOutput,
	UserProfileOutput
} from '@booknex/global/services-types/user-types'
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

import { Auth } from '../decorator/auth.decorator'
import { CurrentUser } from '../decorator/user.decorator'
import { UserUpdatePasswordDto } from './dto/user.update.dto'
import { UserService } from './user.service'

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
	@Get('/visit')
	async visit(@CurrentUser('id') id: number) {
		return this.usersService.visit(+id)
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
	@Get('/favorite-list')
	async favoriteList(
		@CurrentUser('id') id: number
	): Promise<FavoriteListOutput> {
		return this.usersService.favoriteList(+id)
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

	// admin
	@Auth('admin')
	@Get('/all')
	async all(@Query('searchTerm') searchTerm: string): Promise<AllUsersOutput> {
		return this.usersService.all(searchTerm)
	}

	@Auth('admin')
	@Delete('/delete/:id')
	async delete(@Param('id') id: string) {
		return this.usersService.delete(+id)
	}
}
