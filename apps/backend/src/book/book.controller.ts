import {
	Body,
	Controller,
	Delete,
	Get,
	MaxFileSizeValidator,
	Param,
	ParseFilePipe,
	Post,
	Put,
	Query,
	UploadedFile,
	UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import {
	ApiBearerAuth,
	ApiBody,
	ApiConsumes,
	ApiOkResponse,
	ApiTags
} from '@nestjs/swagger'
import { Auth } from '../auth/decorators/auth.decorator'
import { CurrentUser } from '../auth/decorators/user.decorator'
import {
	AdminCatalogOutput,
	AdminInfoByIdOutput,
	EbookByIdOutput,
	InfoByIdOutput
} from './book.model'
import { BookService } from './book.service'
import {
	CreateBookDto,
	EditBookDto,
	UpdateGenreDto
} from './dto/manipulation.book.dto'
import { EBookType } from './dto/update.ebook.dto'

@ApiTags('book')
@ApiBearerAuth()
@Controller('book')
export class BookController {
	constructor(private readonly bookService: BookService) {}

	@Auth()
	@Get('/by-id/:id')
	@ApiOkResponse({ type: InfoByIdOutput })
	async infoById(
		@Param('id') bookId: number,
		@CurrentUser('id') userId: string
	): Promise<InfoByIdOutput> {
		return this.bookService.infoById(+bookId, +userId)
	}

	@Auth()
	@Get('/ebook/:id')
	@ApiOkResponse({ type: EbookByIdOutput })
	async ebookById(
		@Param('id') bookId: number,
		@CurrentUser('id') userId: string
	): Promise<EbookByIdOutput> {
		return this.bookService.ebookById(+bookId, +userId)
	}

	//  admin
	@Auth('admin')
	@Get('admin/by-id/:id')
	@ApiOkResponse({ type: AdminInfoByIdOutput })
	async infoByIdAdmin(@Param('id') id: number): Promise<AdminInfoByIdOutput> {
		return this.bookService.infoByIdAdmin(+id)
	}

	@Auth('admin')
	@Get('/admin/catalog')
	@ApiOkResponse({ type: AdminCatalogOutput })
	async adminCatalog(
		@Query('searchTerm') searchTerm: string,
		@Query('page') page: number
	): Promise<AdminCatalogOutput> {
		return this.bookService.adminCatalog(searchTerm, page || 1)
	}

	@Auth('admin')
	@Post('admin/create')
	@ApiOkResponse({ type: null })
	@ApiBody({
		type: CreateBookDto,
		required: true
	})
	async create(@Body() dto: CreateBookDto) {
		return this.bookService.create(dto)
	}

	@Auth('admin')
	@ApiOkResponse({ type: null })
	@Put('admin/update/:id')
	async update(@Param('id') bookId: number, @Body() dto: EditBookDto) {
		return this.bookService.update(+bookId, dto)
	}

	@Auth('admin')
	@ApiOkResponse({ type: null })
	@Put('admin/update-genre/:id')
	async updateGenre(@Param('id') bookId: number, @Body() dto: UpdateGenreDto) {
		return this.bookService.updateGenre(+bookId, dto)
	}

	@Auth('admin')
	@ApiOkResponse({ type: null })
	@Post('admin/update-ebook/:id')
	@ApiBody({ type: [EBookType] })
	async updateEbook(@Param('id') bookId: number, @Body() dto: EBookType[]) {
		return this.bookService.updateEbook(+bookId, dto)
	}

	@Auth('admin')
	@ApiOkResponse({ type: null })
	@UseInterceptors(FileInterceptor('file'))
	@ApiConsumes('multipart/form-data')
	@Post('admin/update-picture/:id')
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				file: {
					type: 'string',
					format: 'binary'
				}
			}
		}
	})
	async updatePicture(
		@UploadedFile(
			new ParseFilePipe({
				validators: [
					new MaxFileSizeValidator({
						maxSize: 10_000_000
					})
				]
			})
		)
		file: Express.Multer.File,
		@Param('id') bookId: number
	) {
		return this.bookService.updatePicture(+bookId, file)
	}

	@Auth('admin')
	@ApiOkResponse({ type: null })
	@Delete('admin/remove/:id')
	async remove(@Param('id') bookId: number) {
		return this.bookService.remove(+bookId)
	}
}
