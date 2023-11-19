import { useAuth } from '@/hooks/useAuth'
import type { UserLibraryFieldsType } from '@/services/types/user-services-types'
import { userServices } from '@/services/user-service'
import { useQuery } from '@tanstack/react-query'

export const useFavoritesList = (type: keyof UserLibraryFieldsType) => {
	const { user } = useAuth()

	const { isLoading, data: favoriteList } = useQuery(
		['Favorite list'],
		() => userServices.getFavoriteList(),
		{
			enabled: !!user
		}
	)

	return {
		isLoading,
		favoriteList: favoriteList?.[type]
	}
}
