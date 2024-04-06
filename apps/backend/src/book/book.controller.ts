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
import { Book, FullBook } from './book.entity'
import { CatalogOutput } from './book.model'
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
	@ApiOkResponse({ type: Book })
	async infoBySlug(
		@Param('slug') bookSlug: string,
		@CurrentUser('id') userId: string
	): Promise<Book> {
		return this.bookService.infoBySlug(bookSlug, +userId)
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
		throw new Error('Method not implemented.')
		// @ts-ignore
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
