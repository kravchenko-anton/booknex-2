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
import type {
	AllAuthorOutput,
	AllSelectAuthorOutput,
	CreateAuthorOutput,
	InfoByIdOutput
} from '../../../../libs/global/services-types/author-types'
import { Auth } from '../decorator/auth.decorator'
import { AuthorService } from './author.service'
import { CreateAuthorDto, EditAuthorDto } from './dto/manipulation.author.dto'

@ApiTags('author')
@ApiBearerAuth()
@Controller('author')
export class AuthorController {
	constructor(private readonly authorService: AuthorService) {}

	@Auth()
	@Get('by-id/:id')
	async infoById(@Param('id') id: string): Promise<InfoByIdOutput> {
		return this.authorService.getAuthorInfo(+id)
	}

	//  admin

	@Auth('admin')
	@Get('/all')
	async all(@Query('searchTerm') searchTerm: string): Promise<AllAuthorOutput> {
		return this.authorService.all(searchTerm)
	}

	@Auth('admin')
	@Put('/exist/:name')
	async exist(@Param('name') name: string): Promise<{
		id: number
		name: string
	} | null> {
		return this.authorService.exist(name)
	}

	@Auth('admin')
	@Get('/all/select')
	async allSelect(
		@Query('searchTerm') searchTerm: string
	): Promise<AllSelectAuthorOutput> {
		return this.authorService.allSelect(searchTerm)
	}

	@Auth('admin')
	@Post('/create')
	async create(@Body() dto: CreateAuthorDto): Promise<CreateAuthorOutput> {
		return this.authorService.create(dto)
	}

	@Auth('admin')
	@Put('/update/:id')
	async update(@Param('id') bookId: string, @Body() dto: EditAuthorDto) {
		return this.authorService.update(+bookId, dto)
	}

	@Auth('admin')
	@Delete('/delete/:id')
	async delete(@Param('id') id: string) {
		return this.authorService.delete(+id)
	}
}
