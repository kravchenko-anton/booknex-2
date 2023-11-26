import type { CreateBookDto, EditBookDto } from '../../../apps/backend/src/book/dto/manipulation.book.dto'
import { getBookUrl } from '../api/api-config'
import { request } from '../api/request.api'
import type {
	AllBooksOutput,
	BookByIdOutput,
	EbpubOutput,
	EmotionOutput,
	ReviewBookPayload,
	ReviewByIdOutput
} from './book-types'

export const bookService = {
	//
	// @Get('/emotions')
	// 	@Auth()
	// async emotions(): Promise<EmotionOutput> {
	// 	return this.bookService.emotions()
	// }
	//
	// @Post('/review/:id')
	// 	@Auth()
	// async review(
	// 	@CurrentUser('id') userId: number,
	// 	@Param('id') bookId: string,
	// 	@Body() dto: ReviewBookDto
	// ) {
	// 	return this.bookService.review(+userId, +bookId, dto)
	// }
	//
	// @Auth()
	// 	@Get('/by-id/:id')
	// async infoById(@Param('id') bookId: string): Promise<BookByIdOutput> {
	// 	return this.bookService.infoById(+bookId)
	// }
	//
	// @Auth()
	// 	@Get('/by-id/:id/reviews')
	// async reviewsById(
	// 	@Param('id') bookId: string,
	// 	@Query('cursor') cursorId: number
	// ): Promise<ReviewByIdOutput> {
	// 	return this.bookService.reviewsById(+bookId, +cursorId || undefined)
	// }
	//
	// @Auth()
	// 	@Get('/ebook/:id')
	// async ebookById(@Param('id') bookId: string): Promise<EbpubOutput> {
	// 	return this.bookService.ebookById(+bookId)
	// }
	//
	// //  admin
	//
	// @Auth('admin')
	// 	@Get('/all')
	// async all(@Query('searchTerm') searchTerm: string): Promise<AllBooksOutput> {
	// 	return this.bookService.all(searchTerm)
	// }
	//
	// @Auth('admin')
	// 	@Post('/create')
	// async create(@Body() dto: CreateBookDto) {
	// 	return this.bookService.create(dto)
	// }
	//
	// @Auth('admin')
	// 	@Put('/update/:id')
	// async update(@Param('id') bookId: string, @Body() dto: EditBookDto) {
	// 	return this.bookService.update(+bookId, dto)
	// }
	//
	// @Auth('admin')
	// 	@Delete('/delete/:id')
	// async delete(@Param('id') bookId: string) {
	// 	return this.bookService.delete(+bookId)
	// }

		async emotions() {
		return request<EmotionOutput>({
			url: getBookUrl('/emotions')
		})
		},

	async review( bookId: string, dto: ReviewBookPayload) {
		return request({
			method: 'POST',
			url: getBookUrl(`/review/${bookId}`),
			data: dto
		})
	},


	async infoById(id: number) {
		return request<BookByIdOutput>({
			url: getBookUrl(`/by-id/${id}`)
		})
	},

	async reviewsById(id: number, cursor?: number) {
		return request<ReviewByIdOutput>({
			url: getBookUrl(`/by-id/${id}/reviews`),
			params: {
				cursor
			}
		})
	},

	async ebookById(id: number) {
		return request<EbpubOutput>({
			url: getBookUrl(`/ebook/${id}`)
		})
	},

	async all(searchTerm: string) {
		return request<AllBooksOutput>({
			url: getBookUrl('/all'),
			params: {
				searchTerm
			}
		})
	},

	async create(dto: CreateBookDto) {
		return request({
			method: 'POST',
			url: getBookUrl('/create'),
			data: dto
		})
	},

	async update(id: number, dto: EditBookDto) {
		return request({
			method: 'PUT',
			url: getBookUrl(`/update/${id}`),
			data: dto
		})
	},

	async delete(id: number) {
		return request({
			method: 'DELETE',
			url: getBookUrl(`/delete/${id}`)
		})
	}
}
