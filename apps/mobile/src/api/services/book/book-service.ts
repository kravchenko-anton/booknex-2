import { getBookUrl } from 'global/api-config'
import type {
	BookByIdOutput,
	EpubOutputType,
	ReviewBookPayload
} from 'global/services-types/book-types'
import { request } from '../../request.api'

export const bookService = {
	review(bookId: number, dto: ReviewBookPayload) {
		return request<null>({
			method: 'POST',
			url: getBookUrl(`/review/${bookId}`),
			data: dto
		})
	},

	infoById(id: number) {
		return request<BookByIdOutput>({
			url: getBookUrl(`/by-id/${id}`)
		})
	},

	ebookById(id: number) {
		return request<EpubOutputType>({
			url: getBookUrl(`/ebook/${id}`)
		})
	}
}
