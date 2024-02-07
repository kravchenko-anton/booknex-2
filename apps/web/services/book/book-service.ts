import { getAdminUrl, getBookUrl } from 'global/api-config'
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
			url: getBookUrl(getAdminUrl('/all')),
			params: parameters
		})
	},

	async infoById(id: number) {
		return request<InfoByIdAdmin>({
			url: getBookUrl(getAdminUrl(`/by-id/${id}`))
		})
	},

	async create(dto: BookPayload) {
		return request({
			method: 'POST',
			url: getBookUrl(getAdminUrl('/create')),
			data: dto
		})
	},

	async update(id: number, dto: BookUpdatePayload) {
		return request({
			method: 'PUT',
			url: getBookUrl(getAdminUrl(`/update/${id}`)),
			data: dto
		})
	},

	async delete(id: number) {
		return request({
			method: 'DELETE',
			url: getBookUrl(getAdminUrl(`/delete/${id}`))
		})
	}
}
