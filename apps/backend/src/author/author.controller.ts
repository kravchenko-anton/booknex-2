import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import type { AllAuthorOutput, InfoByIdOutput } from '../../../../libs/shared-types/src/author-types'
import { Auth } from '../decorator/auth.decorator'
import { AuthorService } from './author.service'
import { CreateAuthorDto, EditAuthorDto } from './dto/manipulation.author.dto'
import { returnFullAuthorObject } from './return.author.object'

@ApiTags('author')
@ApiBearerAuth()
@Controller('author')
export class AuthorController {
	constructor(private readonly authorService: AuthorService) {}

	@Auth()
	@Get('by-id/:id')
	async infoById(@Param('id') id: string):
		Promise<InfoByIdOutput> {
		return  this.authorService.getAuthorById(+id,  returnFullAuthorObject)
	}

	//  admin

	@Auth('admin')
	@Get('/all')
	async all(@Query('searchTerm') searchTerm: string): Promise<AllAuthorOutput> {
		return this.authorService.all(searchTerm)
	}

	@Auth('admin')
	@Post('/create')
	async create(@Body() dto: CreateAuthorDto) {
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
