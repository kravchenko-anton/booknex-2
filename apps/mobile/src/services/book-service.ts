import { getBookUrl } from '@/services/api-config'
import { request } from '@/services/api/request.api'
import type { BookByIdType, ReviewType } from '@/services/types/book-service-types'

export const bookService = {
	async byId(id: number) {
		return request<BookByIdType>({
			url: getBookUrl(`/by-id/${id}`)
		})
	},
	async review(id: number) {
		return request<ReviewType>({
			url: getBookUrl(`/review/${id}`),
			method: 'POST'
		})
	},
	async emotions() {
		return request({
			url: getBookUrl('/emotions')
		})
	}
}
