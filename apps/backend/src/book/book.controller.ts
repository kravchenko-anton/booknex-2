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
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { Auth } from '../auth/decorators/auth.decorator'
import { CurrentUser } from '../auth/decorators/user.decorator'
import {
	AdminInfoByIdOutput,
	CatalogOutput,
	InfoByIdOutput
} from './book.model'
import { BookService } from './book.service'
import { CreateBookDto } from './dto/create.book.dto'
import { UpdateBookDto } from './dto/update.book.dto'

@ApiTags('📙 book')
@ApiBearerAuth()
@Controller('book')
export class BookController {
	constructor(private readonly bookService: BookService) {}

	@Auth()
	@Get('/info/by-slug/:slug')
	@ApiOkResponse({ type: InfoByIdOutput })
	async infoBySlug(
		@Param('slug') bookSlug: string,
		@CurrentUser('id') userId: string
	): Promise<InfoByIdOutput> {
		return this.bookService.infoById(bookSlug, +userId)
	}

	@Auth('admin')
	@Get('/admin-info/by-slug/:slug')
	@ApiOkResponse({ type: AdminInfoByIdOutput })
	async adminInfoBySlug(
		@Param('slug') slug: number
	): Promise<AdminInfoByIdOutput> {
		return this.bookService.infoByIdAdmin(+slug)
	}

	@Auth('admin')
	@Get('/admin/catalog')
	@ApiOkResponse({ type: CatalogOutput })
	async catalog(
		@Query('searchTerm') searchTerm: string,
		@Query('page') page: number
	): Promise<CatalogOutput> {
		return this.bookService.catalog(searchTerm, page || 1)
	}

	@Auth('admin')
	@Post('admin/create')
	@ApiOkResponse({ type: null })
	@ApiBody({
		type: CreateBookDto,
		description: 'Create book'
	})
	async create(@Body() dto: CreateBookDto) {
		return this.bookService.create(dto)
	}

	@Auth('admin')
	@ApiOkResponse({ type: null })
	@Put('admin/update/:slug')
	async update(@Param('slug') bookId: number, @Body() dto: UpdateBookDto) {
		return this.bookService.update(+bookId, dto)
	}

	@Auth('admin')
	@ApiOkResponse({ type: null })
	@Delete('admin/remove/:slug')
	async remove(@Param('slug') bookId: number) {
		return this.bookService.remove(+bookId)
	}
}
