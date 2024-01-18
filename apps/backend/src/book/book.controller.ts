import type {
	AllBooksOutput,
	AllSelectBooksOutput,
	BookByIdOutput,
	EpubOutput,
	ReviewByIdOutput
} from '@booknex/global/services-types/book-types'
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
import { CurrentUser } from '../decorator/user.decorator'
import { BookService } from './book.service'
import { CreateBookDto, EditBookDto } from './dto/manipulation.book.dto'
import { ReviewBookDto } from './dto/review.book.dto'

@ApiTags('book')
@ApiBearerAuth()
@Controller('book')
export class BookController {
	constructor(private readonly bookService: BookService) {}

	@Post('/review/:id')
	@Auth()
	async review(
		@CurrentUser('id') userId: number,
		@Param('id') bookId: string,
		@Body() dto: ReviewBookDto
	) {
		return this.bookService.review(+userId, +bookId, dto)
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
	@Get('/by-id/:id/reviews')
	async reviewsById(
		@Param('id') bookId: string,
		@Query('cursor') cursorId: number
	): Promise<ReviewByIdOutput> {
		return this.bookService.reviewsById(+bookId, +cursorId || null)
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
	async infoByIdAdmin(@Param('id') id: string) {
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
	@Get('admin/all/select')
	async allSelect(
		@Query('searchTerm') searchTerm: string
	): Promise<AllSelectBooksOutput> {
		return this.bookService.allSelect(searchTerm)
	}

	@Auth('admin')
	@Post('admin/create')
	async create(@Body() dto: CreateBookDto) {
		return this.bookService.create(dto)
	}

	@Auth('admin')
	@Put('admin/toggle-visible/:id')
	toggleVisible(@Param('id') id: string) {
		return this.bookService.toggleVisible(+id)
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
