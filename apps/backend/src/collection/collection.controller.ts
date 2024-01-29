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
import { ApiTags } from '@nestjs/swagger'
import type {
	AllCollectionOutput,
	CollectionByIdOutput
} from '../../../../libs/global/services-types/collection-types'
import { Auth } from '../decorator/auth.decorator'
import { CurrentUser } from '../decorator/user.decorator'
import { CollectionService } from './collection.service'
import { CreateCollectionDto, UpdateCollectionDto } from './dto/collection.dto'

@ApiTags('collection')
@Controller('collection')
export class CollectionController {
	constructor(private readonly shelvesService: CollectionService) {}

	@Get('/by-id/:id')
	@Auth()
	async byId(
		@Param('id') id: number,
		@CurrentUser('id') userId: number
	): Promise<CollectionByIdOutput> {
		return this.shelvesService.infoById(+id, +userId)
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
