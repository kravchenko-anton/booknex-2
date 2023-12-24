import { useAuth } from '@/hooks/useAuth'
import type { UserLibraryFieldsType } from '@/navigation/types'
import { userServices } from '@/services/user/user-service'
import { useQuery } from '@tanstack/react-query'

export const useFavoritesList = (type: UserLibraryFieldsType) => {
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
