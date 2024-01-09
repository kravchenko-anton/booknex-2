import type {
	AllCollectionOutput,
	CollectionByIdOutput
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
import { CreateCollectionDto, UpdateCollectionDto } from './dto/collection.dto'

@ApiTags('collection')
@ApiBearerAuth()
@Controller('collection')
export class CollectionController {
	constructor(private readonly shelvesService: CollectionService) {}

	@Get('/by-id/:id')
	@Auth()
	async byId(@Param('id') id: number): Promise<CollectionByIdOutput> {
		return this.shelvesService.infoById(+id)
	}

	// admin
	@Get('/all')
	@Auth('admin')
	all(@Query('searchTerm') searchTerm: string): Promise<AllCollectionOutput> {
		return this.shelvesService.all(searchTerm)
	}

	@Post('/create')
	@Auth('admin')
	async create(@Body() dto: CreateCollectionDto) {
		return this.shelvesService.create(dto)
	}

	@Delete('/delete/:id')
	@Auth('admin')
	async delete(@Param('id') id: string) {
		return this.shelvesService.delete(+id)
	}

	@Put('/update/:id')
	@Auth('admin')
	async update(@Param('id') id: string, @Body() dto: UpdateCollectionDto) {
		return this.shelvesService.update(+id, dto)
	}
}
