import { getAdminUrl } from '@/services/api-config'
import { request } from '@/services/api/request.api'
import type { StatisticsType } from '@/services/types/admin-service-types'

export const adminService = {
	async statistics() {
		return request<StatisticsType>({
			url: getAdminUrl('/statistics'),
			method: 'GET'
		})
	}
}
