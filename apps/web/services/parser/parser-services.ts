import { getParserUrl } from '../api/api-config'
import { request } from '../api/request.api'

export const parserService = {
  async all(searchTerm?: string) {
    return request({
      url: getParserUrl('/all'),
      params: {
        searchTerm
      }
    })
  },
}
