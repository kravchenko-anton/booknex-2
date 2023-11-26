import type { AuthorType } from '../../mobile/src/services/types/author-service-types'
import { getAuthorUrl } from './api-config'
import { request } from './api/request.api'

export const authorService = {
	async byId(id: number) {
		return request<AuthorType>({
			url: getAuthorUrl(`/by-id/${id}`)
		})
	},
}
