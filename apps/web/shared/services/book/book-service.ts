import { getBookUrl } from 'global/api-config'
import type {
	AllBooksOutput,
	BookPayload,
	BookUpdatePayload,
	InfoByIdAdmin
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
		return request<InfoByIdAdmin>({
			url: getBookUrl(`/admin/by-id/${id}`)
		})
	},

	async create(dto: BookPayload) {
		return request({
			method: 'POST',
			url: getBookUrl('/admin/create'),
			data: dto
		})
	},

	async update(id: number, dto: BookUpdatePayload) {
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
