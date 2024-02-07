import { getAdminUrl, getParserUrl } from 'global/api-config'
import type {
	AllGoodReadBookOutput,
	ByIdOutput,
	ParserDtoPayload,
	UnfoldOutput
} from 'global/services-types/parser-types'
import { request } from '../api/request.api'

export const parserService = {
	async all(parameters: {
		page: number
		searchTerm?: string
	}): Promise<AllGoodReadBookOutput> {
		return request({
			url: getParserUrl(getAdminUrl('/all')),
			params: parameters
		})
	},

	async byId(id: number) {
		return request<ByIdOutput>({
			url: getParserUrl(getAdminUrl(`/by-id/${id}`)),
			method: 'GET'
		})
	},

	async parse(dto: ParserDtoPayload) {
		return request({
			url: getParserUrl(getAdminUrl('/parse')),
			data: {
				...dto
			},
			method: 'POST',
			timeout: 0
		})
	},
	unfold(file: FormData): Promise<UnfoldOutput> {
		return request({
			url: getParserUrl(getAdminUrl('/unfold')),
			method: 'POST',
			data: file,
			timeout: 10_000,
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
	},

	async delete(id: number) {
		return request<null>({
			url: getParserUrl(getAdminUrl(`/delete/${id}`)),
			method: 'DELETE'
		})
	}
}
