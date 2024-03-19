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
import environment from '../utils/common/environment.config'
import {
	AdminInfoByIdOutput,
	CatalogOutput,
	InfoByIdOutput
} from './book.model'
import { BookService } from './book.service'
import { CreateBookDto } from './dto/create.book.dto'
import {
	UpdateBookDto,
	UpdateGenreDto,
	UpdatePictureDto
} from './dto/update.book.dto'
import { EbookByIdOutput, PayloadEBook, StoredEBook } from './ebook.model'

@ApiTags('📙 book')
@ApiBearerAuth()
@Controller('book')
export class BookController {
	constructor(private readonly bookService: BookService) {}

	@Auth()
	@Get('/info/by-id/:id')
	@ApiOkResponse({ type: InfoByIdOutput })
	async infoById(
		@Param('id') bookId: number,
		@CurrentUser('id') userId: string
	): Promise<InfoByIdOutput> {
		return this.bookService.infoById(+bookId, +userId)
	}

	@Auth()
	@Get('/ebook/by-id/:id')
	@ApiOkResponse({ type: EbookByIdOutput })
	async ebookById(
		@Param('id') bookId: number,
		@CurrentUser('id') userId: string
	): Promise<EbookByIdOutput> {
		return this.bookService.ebookById(+bookId, +userId)
	}

	//  admin

	@Auth('admin')
	@Get('/admin/stored-ebook/:id')
	@ApiOkResponse({ type: [StoredEBook] })
	async storedEbook(@Param('id') bookId: number): Promise<StoredEBook[]> {
		return this.bookService.storedEbook(+bookId)
	}
	@Auth('admin')
	@Get('/admin-info/by-id/:id')
	@ApiOkResponse({ type: AdminInfoByIdOutput })
	async adminInfoById(@Param('id') id: number): Promise<AdminInfoByIdOutput> {
		return this.bookService.infoByIdAdmin(+id)
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
	@UseInterceptors(FileInterceptor('picture'))
	@ApiConsumes('multipart/form-data')
	async create(
		@UploadedFile(
			new ParseFilePipe({
				validators: [
					new MaxFileSizeValidator({
						maxSize: environment.MAX_UPLOAD_SIZE
					})
				]
			})
		)
		picture: Express.Multer.File,
		@Body() dto: CreateBookDto
	) {
		return this.bookService.create(dto, picture)
	}

	@Auth('admin')
	@ApiOkResponse({ type: null })
	@Put('admin/update/:id')
	async update(@Param('id') bookId: number, @Body() dto: UpdateBookDto) {
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
	@Put('admin/update-picture/:id')
	@ApiBody({ type: UpdatePictureDto })
	@UseInterceptors(FileInterceptor('picture'))
	@ApiConsumes('multipart/form-data')
	async updatePicture(
		@UploadedFile(
			new ParseFilePipe({
				validators: [
					new MaxFileSizeValidator({
						maxSize: environment.MAX_UPLOAD_SIZE
					})
				]
			})
		)
		picture: Express.Multer.File,
		@Param('id') bookId: number
	) {
		return this.bookService.updatePicture(+bookId, picture)
	}

	@Auth('admin')
	@ApiOkResponse({ type: null })
	@Post('admin/update-ebook/:id')
	@ApiBody({ type: [PayloadEBook] })
	async updateEbook(@Param('id') bookId: number, @Body() dto: PayloadEBook[]) {
		return this.bookService.updateEbook(+bookId, dto)
	}

	@Auth('admin')
	@ApiOkResponse({ type: null })
	@Delete('admin/remove/:id')
	async remove(@Param('id') bookId: number) {
		return this.bookService.remove(+bookId)
	}
}
