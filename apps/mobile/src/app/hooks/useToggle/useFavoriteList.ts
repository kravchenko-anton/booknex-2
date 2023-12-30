import { useAuth } from '@/hooks/useAuth'

import { userServices } from '@/services/user/user-service'
import { useQuery } from '@tanstack/react-query'
import type { UserLibraryCategoryType } from '../../../../../backend/src/user/user.types'

export const useFavoritesList = (type: UserLibraryCategoryType) => {
	const { user } = useAuth()

	const { isLoading, data: favoriteList } = useQuery(
		['favorite-list'],
		() => userServices.favoriteList(),
		{
			enabled: !!user
		}
	)

	return {
		isLoading,
		favoriteList: favoriteList?.[type]
	}
}
