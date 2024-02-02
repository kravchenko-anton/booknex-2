import { getAdminUrl } from 'global/api-config'
import type { StatisticsOutputType } from 'global/services-types/admin-types'
import { request } from '../api/request.api'

export const adminService = {
	statistics() {
		return request<StatisticsOutputType>({
			url: getAdminUrl('/dashboard'),
			method: 'GET'
		})
	}
}
