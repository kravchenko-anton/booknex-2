import type {
	AllGoodReadBookOutput,
	ParserDtoPayload
} from '../../../../libs/global/services-types/parser-types'
import { getParserUrl } from '../api/api-config'
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

	async delete(id: number) {
		return request({
			url: getParserUrl(`/delete/${id}`),
			method: 'DELETE'
		})
	}
}
