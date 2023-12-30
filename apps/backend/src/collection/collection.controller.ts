import type {
	AllShelfOutput,
	ShelfByIdOutput
} from '@booknex/global/services-types/collection-types'
import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { Auth } from '../decorator/auth.decorator'
import { CollectionService } from './collection.service'
import { CreateShelfDto, UpdateShelfDto } from './dto/collection.dto'

@ApiTags('collection')
@ApiBearerAuth()
@Controller('collection')
export class CollectionController {
	constructor(private readonly shelvesService: CollectionService) {}

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
