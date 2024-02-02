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
	AllBooksOutput,
	BookByIdOutput,
	EpubOutput,
	InfoByIdAdmin
} from '../../../../libs/global/services-types/book-types'

import { Auth } from '../decorator/auth.decorator'
import { CurrentUser } from '../decorator/user.decorator'
import type { BookService } from './book.service'
import type { FeedbackBookDto } from './dto/feedback.book.dto'
import type { CreateBookDto, EditBookDto } from './dto/manipulation.book.dto'

@ApiTags('book')
@ApiBearerAuth()
@Controller('book')
export class BookController {
	constructor(private readonly bookService: BookService) {}
	//TODO: сделать send book-feedback
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
	): Promise<EpubOutput> {
		return this.bookService.ebookById(+bookId, +userId)
	}

	//  admin

	@Auth('admin')
	@Get('admin/by-id/:id')
	async infoByIdAdmin(@Param('id') id: string): Promise<InfoByIdAdmin> {
		return this.bookService.infoByIdAdmin(+id)
	}

	@Auth('admin')
	@Get('/admin/all')
	async all(
		@Query('searchTerm') searchTerm: string,
		@Query('page') page: number
	): Promise<AllBooksOutput> {
		return this.bookService.all(searchTerm, page || 1)
	}

	@Auth('admin')
	@Post('admin/create')
	async create(@Body() dto: CreateBookDto) {
		return this.bookService.create(dto)
	}

	@Auth('admin')
	@Put('admin/update/:id')
	async update(@Param('id') bookId: string, @Body() dto: EditBookDto) {
		return this.bookService.update(+bookId, dto)
	}

	@Auth('admin')
	@Delete('admin/delete/:id')
	async delete(@Param('id') bookId: string) {
		return this.bookService.delete(+bookId)
	}
}
