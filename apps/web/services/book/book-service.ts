import type {
	AllBooksOutput,
	AllSelectBooksOutput,
	BookByIdOutput,
	BookPayload,
	EbpubOutput,
	EmotionOutput,
	ReviewBookPayload,
	ReviewByIdOutput
} from '../../../../libs/global/services-types/book-types'
import { getAuthorUrl, getBookUrl } from '../api/api-config'
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

	async allSelect(searchTerm?: string) {
		return request<AllSelectBooksOutput>({
			url: getAuthorUrl('/all/select'),
			params: { searchTerm }
		})
	},
	async toggleVisible(id: number) {
		return request({
			method: 'PUT',
			url: getBookUrl(`/toggle-visible/${id}`)
		})
	},

	async create(dto: BookPayload) {
		return request({
			method: 'POST',
			url: getBookUrl('/create'),
			data: dto
		})
	},

	async update(id: number, dto: Partial<BookPayload>) {
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
