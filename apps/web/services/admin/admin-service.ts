import { getAdminUrl } from 'global/api-config'
import type { StatisticsOutput } from 'global/services-types/admin-types'
import { request } from '../api/request.api'

export const adminService = {
	statistics() {
		return request<StatisticsOutput>({
			url: getAdminUrl('/statistics'),
			method: 'GET'
		})
	}
}
