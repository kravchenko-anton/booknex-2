import { getAdminUrl } from '../api/api-config'
import { request } from '../api/request.api'
import type { StatisticsOutput } from './admin-types'

export const adminService = {
  statistics() {
    return request<StatisticsOutput>({
      url: getAdminUrl(`/statistics`),
      method: 'GET'
    })
  }
}
