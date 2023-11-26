import type { BookByIdOutput, EmotionOutput, ReviewByIdOutput } from '@/shared-types/book-types'
import type { EbpubOutput } from '@/shared-types/book-types'
import { getBookUrl } from './api-config'
import { request } from './api/request.api'

export const bookService = {
	async byId(id: number) {
		return request<BookByIdOutput>({
			url: getBookUrl(`/by-id/${id}`)
		})
	},
	async reviewById(id: number) {
		return request<ReviewByIdOutput>({
			url: getBookUrl(`/review/${id}`),
			method: 'POST'
		})
	},
	async ebookById(id: number) {
		return request<EbpubOutput>({
			url: getBookUrl(`/ebook/${id}`),
			method: 'POST'
		})
	},
	async emotions() {
		return request<EmotionOutput>({
			url: getBookUrl('/emotions')
		})
	}
}
