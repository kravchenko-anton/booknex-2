import { Controller, Delete, Get, Param, Patch, Query } from '@nestjs/common'
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { Auth } from '../auth/decorators/auth.decorator'
import { CurrentUser } from '../auth/decorators/user.decorator'
import { UserAdminCatalog, UserLibrary, UserProfile } from './user.model'
// import { UserLibrary, UserProfile } from './user.model'
import { UserService } from './user.service'

@ApiBearerAuth()
@Controller('user')
@ApiTags('👤 user')
export class UserController {
	constructor(private readonly usersService: UserService) {}
	@Auth()
	@Get('/profile')
	@ApiOkResponse({ type: UserProfile })
	async profile(@CurrentUser('id') id: number) {
		return this.usersService.profile(+id)
	}

	@Auth()
	@Get('/library')
	@ApiOkResponse({ type: UserLibrary })
	async library(@CurrentUser('id') id: number) {
		return this.usersService.library(+id)
	}

	@Auth()
	@Patch('/start-reading/:id')
	async startReading(
		@CurrentUser('id') userId: number,
		@Param('id') id: number
	) {
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
	@ApiOkResponse({ type: Boolean })
	async toggleSave(@CurrentUser('id') userId: number, @Param('id') id: number) {
		return this.usersService.toggleSave(userId, +id)
	}

	@Auth()
	@Get('/is-saved/:id')
	@ApiOkResponse({ type: Boolean })
	async isSaved(@CurrentUser('id') userId: number, @Param('id') id: number) {
		return this.usersService.isSaved(userId, +id)
	}

	// admin
	@Auth('admin')
	@Get('admin/catalog')
	@ApiOkResponse({ type: UserAdminCatalog })
	async adminCatalog(
		@Query('searchTerm') searchTerm: string,
		@Query('page') page: number
	): Promise<UserAdminCatalog> {
		return this.usersService.adminCatalog(searchTerm || '', page || 1)
	}

	@Auth('admin')
	@Delete('admin/remove/:id')
	async remove(@Param('id') id: number) {
		return this.usersService.remove(+id)
	}
}
