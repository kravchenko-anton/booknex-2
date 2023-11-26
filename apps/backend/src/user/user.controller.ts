import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import type {
	AllUsersOutput,
	FavoriteListOutput,
	ToggleOutput,
	UserLibraryOutput,
	UserProfileOutput
} from '../../../../libs/services/user/user-types'
import { Auth } from '../decorator/auth.decorator'
import { CurrentUser } from '../decorator/user.decorator'
import { FilenameDto } from '../storage/dto/upload.dto'
import { UserUpdateBioDto, UserUpdatePasswordDto } from './dto/user.update.dto'
import { UserService } from './user.service'
import { UserLibraryCategoryType } from './user.types'

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
	@Get('/library')
	async library(@CurrentUser('id') id: number): Promise<UserLibraryOutput> {
		return this.usersService.library(+id)
	}



	@Auth()
	@Post('/update-bio')
	async updateBio(
		@CurrentUser('id') id: number,
		@Body() dto: UserUpdateBioDto
	) {
		return this.usersService.updateBio(+id, dto)
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
	@Post('/update-picture')
	async updatePicture(@CurrentUser('id') id: number, @Body() dto: FilenameDto) {
		return this.usersService.updatePicture(+id, dto.filename)
	}

	@Auth()
	@Get('/favorite-list')
	async favoriteList(@CurrentUser('id') id: number): Promise<FavoriteListOutput> {
		return this.usersService.favoriteList(+id)
	}

	@Auth()
	@Patch('/toggle/:id')
	async toggle(
		@CurrentUser('id') userId: number,
		@Param('id') id: string,
		@Query('type')
		type: UserLibraryCategoryType
	): Promise<ToggleOutput> {
		return this.usersService.toggle(userId, +id, type)
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
