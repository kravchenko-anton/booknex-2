import { getAuthorUrl } from '@/services/api-config'
import { request } from '@/services/api/request.api'
import type { AuthorType } from '@/services/types/author-service-types'

export const authorService = {
	async byId(id: number) {
		return request<AuthorType>({
			url: getAuthorUrl(`/by-id/${id}`)
		})
	}
}
