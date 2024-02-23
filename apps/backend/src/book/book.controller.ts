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
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger'
import { Auth } from '../auth/decorators/auth.decorator'
import { CurrentUser } from '../auth/decorators/user.decorator'
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
	@ApiBody({ type: ReviewBookDto, required: true, description: 'Review book' })
	async review(
		@CurrentUser('id') userId: number,
		@Param('id') bookId: number,
		@Body() dto: ReviewBookDto
	) {
		return this.bookService.review(+userId, +bookId, dto)
	}

	@Auth()
	@Get('/by-id/:id')
	async infoById(
		@Param('id') bookId: number,
		@CurrentUser('id') userId: string
	) {
		return this.bookService.infoById(+bookId, +userId)
	}

	@Auth()
	@Get('/ebook/:id')
	async ebookById(
		@Param('id') bookId: number,
		@CurrentUser('id') userId: string
	) {
		return this.bookService.ebookById(+bookId, +userId)
	}

	//  admin
	@Auth('admin')
	@Get('admin/by-id/:id')
	async infoByIdAdmin(@Param('id') id: number) {
		return this.bookService.infoByIdAdmin(+id)
	}

	@Auth('admin')
	@Get('/admin/all')
	async all(
		@Query('searchTerm') searchTerm: string,
		@Query('page') page: number
	) {
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
	async update(@Param('id') bookId: number, @Body() dto: EditBookDto) {
		return this.bookService.update(+bookId, dto)
	}

	@Auth('admin')
	@Delete('admin/delete/:id')
	async delete(@Param('id') bookId: number) {
		return this.bookService.delete(+bookId)
	}
}
