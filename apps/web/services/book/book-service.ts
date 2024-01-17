import { getAuthorUrl, getBookUrl } from 'global/api-config'
import type {
	AllBooksOutput,
	AllSelectBooksOutput,
	BookByIdOutput,
	BookPayload
} from 'global/services-types/book-types'
import { request } from '../api/request.api'

export const bookService = {
	async all(parameters: { page: number; searchTerm?: string }) {
		return request<AllBooksOutput>({
			url: getBookUrl('/all'),
			params: parameters
		})
	},

	async infoById(id: number) {
		return request<BookByIdOutput>({
			url: getBookUrl(`/by-id/${id}`)
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
