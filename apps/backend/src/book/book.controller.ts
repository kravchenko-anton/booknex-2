import {
	CatalogOutput,
	CreateBookDto,
	FullBook,
	InfoBySlug,
	UpdateBookDto
} from '@/src/book/book.dto'
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
import { BookService } from './book.service'

@ApiTags('📙 book')
@ApiBearerAuth()
@Controller('book')
export class BookController {
	constructor(private readonly bookService: BookService) {}

	@Get('/info/by-slug/:slug')
	@ApiOkResponse({ type: InfoBySlug })
	async infoBySlug(@Param('slug') bookSlug: string): Promise<InfoBySlug> {
		return this.bookService.infoBySlug(bookSlug)
	}

	@Auth('admin')
	@Get('/admin-info/by-slug/:slug')
	@ApiOkResponse({ type: FullBook })
	async adminInfoBySlug(@Param('slug') slug: string): Promise<FullBook> {
		return this.bookService.infoBySlugAdmin(slug)
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
	@ApiOkResponse({ type: undefined })
	@ApiBody({
		type: CreateBookDto,
		description: 'Create book'
	})
	async create(@Body() dto: CreateBookDto) {
		return this.bookService.create(dto)
	}

	@Auth('admin')
	@ApiOkResponse({ type: undefined })
	@Put('admin/update/:slug')
	async update(@Param('slug') bookSlug: string, @Body() dto: UpdateBookDto) {
		return this.bookService.update(bookSlug, dto)
	}

	@Auth('admin')
	@ApiOkResponse({ type: undefined })
	@Delete('admin/remove/:slug')
	async remove(@Param('slug') slug: string) {
		return this.bookService.remove(slug)
	}
}
