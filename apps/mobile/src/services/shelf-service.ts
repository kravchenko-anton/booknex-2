import { getShelfUrl } from '@/services/api-config'
import { request } from '@/services/api/request.api'
import type {
	ShelfType,
	ShortShelfType
} from '@/services/types/shelf-service-types'

export const shelfService = {
	async catalog() {
		return request<ShortShelfType[]>({
			url: getShelfUrl('/catalog'),
			method: 'GET'
		})
	},
	async byId(id: number) {
		return request<
			ShelfType & {
				statistics: [
					{
						count: number | string
						title: string
					}
				]
			}
		>({
			url: getShelfUrl(`/by-id/${id}`)
		})
	}
}
