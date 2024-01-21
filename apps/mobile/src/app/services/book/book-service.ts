import { getBookUrl } from 'global/api-config'
import type {
	BookByIdOutput,
	EpubOutput,
	FeedbackBookPayload
} from 'global/services-types/book-types'
import { request } from '../api/request.api'

export const bookService = {
	feedback(bookId: number, dto: FeedbackBookPayload) {
		return request<null>({
			method: 'POST',
			url: getBookUrl(`/feedback/${bookId}`),
			data: dto
		})
	},

	infoById(id: number) {
		return request<BookByIdOutput>({
			url: getBookUrl(`/by-id/${id}`)
		})
	},

	ebookById(id: number) {
		return request<EpubOutput>({
			url: getBookUrl(`/ebook/${id}`)
		})
	}
}
