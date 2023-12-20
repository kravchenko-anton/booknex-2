import { getParserUrl } from '../../../../libs/global/api-config'
import type {
	AllGoodReadBookOutput,
	ParserDtoPayload
} from '../../../../libs/global/services-types/parser-types'
import { request } from '../api/request.api'

export const parserService = {
	async all(searchTerm?: string): Promise<AllGoodReadBookOutput> {
		return request({
			url: getParserUrl('/all'),
			params: {
				searchTerm
			}
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
	unfold(file: FormData) {
		return request<
			{
				title: string
				content: string
			}[]
		>({
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
		return request({
			url: getParserUrl(`/delete/${id}`),
			method: 'DELETE'
		})
	}
}
