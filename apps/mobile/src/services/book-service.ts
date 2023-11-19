import { getBookUrl } from '@/services/api-config'
import { request } from '@/services/api/request.api'
import type {
	BookByIdType,
	BookManipulationType,
	ReviewType,
	ShortBookType
} from '@/services/types/book-service-types'

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
	},
	// admin

	async create() {
		return request<BookManipulationType>({
			url: getBookUrl('/create'),
			method: 'POST'
		})
	},

	async all(cursor?: number) {
		return request<ShortBookType[]>({
			url: getBookUrl('/all' + (cursor ? `?cursor=${cursor}` : ''))
		})
	},

	async delete(id: number) {
		return request({
			url: getBookUrl(`/delete/${id}`),
			method: 'DELETE'
		})
	},

	async update(id: number) {
		return request<BookManipulationType>({
			url: getBookUrl(`/update/${id}`),
			method: 'PUT'
		})
	}
}
