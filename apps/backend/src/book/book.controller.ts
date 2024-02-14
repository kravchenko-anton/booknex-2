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
import {
	ApiBearerAuth,
	ApiBody,
	ApiParam,
	ApiQuery,
	ApiTags
} from '@nestjs/swagger'
import type {
	AllBooksOutput,
	BookByIdOutput,
	EpubOutputType,
	InfoByIdAdmin
} from '../../../../libs/global/services-types/book-types'
import { Auth } from '../decorator/auth.decorator'
import { CurrentUser } from '../decorator/user.decorator'
import { BookService } from './book.service'
import { FeedbackBookDto } from './dto/feedback.book.dto'
import { CreateBookDto, EditBookDto } from './dto/manipulation.book.dto'

@ApiTags('book')
@ApiBearerAuth()
@Controller('book')
export class BookController {
	constructor(private readonly bookService: BookService) {}
	@Post('/feedback/:id')
	@Auth()
	async feedback(
		@CurrentUser('id') userId: number,
		@Param('id') bookId: string,
		@Body() dto: FeedbackBookDto
	) {
		return this.bookService.feedback(+userId, +bookId, dto)
	}

	@Auth()
	@Get('/by-id/:id')
	async infoById(
		@Param('id') bookId: string,
		@CurrentUser('id') userId: string
	): Promise<BookByIdOutput> {
		return this.bookService.infoById(+bookId, +userId)
	}

	@Auth()
	@Get('/ebook/:id')
	async ebookById(
		@Param('id') bookId: string,
		@CurrentUser('id') userId: string
	): Promise<EpubOutputType> {
		return this.bookService.ebookById(+bookId, +userId)
	}

	//  admin
	// add under tag admin or just separate controller
	@Auth('admin')
	@Get('admin/by-id/:id')
	@ApiParam({ name: 'id', required: false, example: 1 })
	async infoByIdAdmin(@Param('id') id: string): Promise<InfoByIdAdmin> {
		return this.bookService.infoByIdAdmin(+id)
	}

	@Auth('admin')
	@Get('/admin/all')
	@ApiQuery({ name: 'searchTerm', required: false, example: 'The Hobbit' })
	@ApiQuery({ name: 'page', required: false, example: 1 })
	async all(
		@Query('searchTerm') searchTerm: string,
		@Query('page') page: number
	): Promise<AllBooksOutput> {
		return this.bookService.all(searchTerm, page || 1)
	}

	@Auth('admin')
	@Post('admin/create')
	@ApiBody({ type: CreateBookDto })
	async create(@Body() dto: CreateBookDto) {
		return this.bookService.create(dto)
	}

	@Auth('admin')
	@Put('admin/update/:id')
	@ApiParam({ name: 'id', required: false, example: 1 })
	async update(@Param('id') bookId: string, @Body() dto: EditBookDto) {
		return this.bookService.update(+bookId, dto)
	}

	@Auth('admin')
	@Delete('admin/delete/:id')
	@ApiParam({ name: 'id', required: false, example: 1 })
	async delete(@Param('id') bookId: string) {
		return this.bookService.delete(+bookId)
	}
}
