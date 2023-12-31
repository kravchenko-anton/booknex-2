import { getBookUrl } from 'global/api-config'
import type {
	BookByIdOutput,
	EmotionOutput,
	EpubOutput,
	ReviewBookPayload,
	ReviewByIdOutput
} from 'global/services-types/book-types'
import { request } from '../api/request.api'

export const bookService = {
	async emotions() {
		return request<EmotionOutput>({
			url: getBookUrl('/emotions')
		})
	},

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

	async reviewsById(id: number, cursor?: number) {
		return request<ReviewByIdOutput>({
			url: getBookUrl(`/by-id/${id}/reviews`),
			params: {
				cursor
			}
		})
	},

	async ebookById(id: number) {
		return request<EpubOutput>({
			url: getBookUrl(`/ebook/${id}`)
		})
	}
}
