import { getParserUrl } from 'global/api-config'
import type {
	AllGoodReadBookOutput,
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
			url: getParserUrl('/all'),
			params: parameters
		})
	},

	async parse(dto: ParserDtoPayload) {
		return request({
			url: getParserUrl('/parse'),
			data: {
				...dto
			},
			method: 'POST',
			timeout: 0
		})
	},
	unfold(file: FormData): Promise<UnfoldOutput> {
		return request({
			url: getParserUrl('/unfold'),
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
			url: getParserUrl(`/delete/${id}`),
			method: 'DELETE'
		})
	}
}
