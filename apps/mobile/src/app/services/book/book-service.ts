import { getBookUrl } from 'global/api-config'
import type {
	BookByIdOutput,
	EpubOutput,
	ReviewBookPayload
} from 'global/services-types/book-types'
import { request } from '../api/request.api'

export const bookService = {
	//TODO: переделать
	async review(bookId: string, dto: ReviewBookPayload) {
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

	async ebookById(id: number) {
		return request<EpubOutput>({
			url: getBookUrl(`/ebook/${id}`)
		})
	}
}
