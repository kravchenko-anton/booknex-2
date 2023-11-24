import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import type { ShelfByIdOutput, ShelfCatalogOutput } from '../../../../libs/shared-types/src/shelf-types'
import type { AllShelfOutput } from '../../../../libs/shared-types/src/shelf-types'
import { Auth } from '../decorator/auth.decorator'
import { CurrentUser } from '../decorator/user.decorator'
import { CreateShelfDto, UpdateShelfDto } from './dto/shelf.dto'
import { ShelfService } from './shelf.service'

@ApiTags('shelf')
@ApiBearerAuth()
@Controller('shelf')
export class ShelfController {
	constructor(private readonly shelvesService: ShelfService) {}
	@Get('/catalog')
	@Auth()
	async catalog(@CurrentUser('id') userId: number): Promise<ShelfCatalogOutput> {
		return this.shelvesService.catalog(userId)
	}

	@Get('/by-id/:id')
	@Auth()
	async byId(@Param('id') shelfId: number): Promise<ShelfByIdOutput> {
		return this.shelvesService.infoById(+shelfId)
	}

	// admin
	@Get('/all')
	@Auth('admin')
	async all(@Query('searchTerm') searchTerm: string): Promise<AllShelfOutput> {
		return this.shelvesService.all(searchTerm)
	}

	@Post('/create')
	@Auth('admin')
	async create(@Body() dto: CreateShelfDto) {
		return this.shelvesService.create(dto)
	}

	@Delete('/delete/:id')
	@Auth('admin')
	async delete(@Param('id') id: string) {
		return this.shelvesService.delete(+id)
	}

	@Put('/update/:id')
	@Auth('admin')
	async update(@Param('id') id: string, @Body() dto: UpdateShelfDto) {
		return this.shelvesService.update(+id, dto)
	}
}
