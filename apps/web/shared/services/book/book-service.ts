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
			url: getBookUrl('/admin/all'),
			params: parameters
		})
	},

	async infoById(id: number) {
		return request<BookByIdOutput>({
			url: getBookUrl(`/admin/by-id/${id}`)
		})
	},

	async allSelect(searchTerm?: string) {
		return request<AllSelectBooksOutput>({
			url: getAuthorUrl('/admin/all/select'),
			params: { searchTerm }
		})
	},

	async toggleVisible(id: number) {
		return request({
			method: 'PUT',
			url: getBookUrl(`/admin/toggle-visible/${id}`)
		})
	},

	async create(dto: BookPayload) {
		return request({
			method: 'POST',
			url: getBookUrl('/admin/create'),
			data: dto
		})
	},

	async update(id: number, dto: Partial<BookPayload>) {
		return request({
			method: 'PUT',
			url: getBookUrl(`/admin/update/${id}`),
			data: dto
		})
	},

	async delete(id: number) {
		return request({
			method: 'DELETE',
			url: getBookUrl(`/admin/delete/${id}`)
		})
	}
}
