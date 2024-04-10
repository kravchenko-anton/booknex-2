import { Controller, Delete, Get, Param, Patch, Query } from '@nestjs/common'
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { Auth } from '../auth/decorators/auth.decorator'
import { CurrentUser } from '../auth/decorators/user.decorator'
import { UserCatalogOutput, UserLibraryOutput } from './user.model'
import { UserService } from './user.service'

@ApiBearerAuth()
@Controller('user')
@ApiTags('👤 user')
export class UserController {
	constructor(private readonly usersService: UserService) {}

	@Auth()
	@Get('/library')
	@ApiOkResponse({ type: UserLibraryOutput })
	async library(@CurrentUser('id') id: number) {
		return this.usersService.library(+id)
	}

	@Auth()
	@Patch('/start-reading/:slug')
	async startReading(
		@CurrentUser('id') userId: number,
		@Param('slug') slug: string
	) {
		return this.usersService.startReading(userId, slug)
	}

	@Auth()
	@Patch('/finish-reading/:slug')
	async finishReading(
		@CurrentUser('id') userId: number,
		@Param('slug') slug: string
	) {
		return this.usersService.finishReading(userId, slug)
	}

	@Auth()
	@Patch('/toggle-save/:slug')
	@ApiOkResponse({ type: Boolean })
	async toggleSave(
		@CurrentUser('id') userId: number,
		@Param('slug') slug: string
	) {
		return this.usersService.toggleSave(userId, slug)
	}

	@Auth()
	@Get('/is-saved/:slug')
	@ApiOkResponse({ type: Boolean })
	async isSaved(
		@CurrentUser('id') userId: number,
		@Param('slug') slug: string
	) {
		return this.usersService.isSaved(userId, slug)
	}

	// admin
	@Auth('admin')
	@Get('admin/catalog')
	@ApiOkResponse({ type: UserCatalogOutput })
	async catalog(
		@Query('searchTerm') searchTerm: string,
		@Query('cursor') cursor: number
	): Promise<UserCatalogOutput> {
		return this.usersService.catalog(searchTerm || '', cursor)
	}

	@Auth('admin')
	@Delete('admin/remove/:id')
	async remove(@Param('id') id: number) {
		return this.usersService.remove(+id)
	}
}
