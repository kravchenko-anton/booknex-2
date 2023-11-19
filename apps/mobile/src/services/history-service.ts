import { getHistoryUrl } from '@/services/api-config'
import { request } from '@/services/api/request.api'
import type { AddHistoryDto } from '@/services/types/history-service-types'

export const historyService = {
	async createHistory(dto: AddHistoryDto[]) {
		return request({
			url: getHistoryUrl('/create'),
			method: 'POST',
			data: dto
		})
	}
}
