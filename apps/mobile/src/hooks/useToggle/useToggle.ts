import { useFavoritesList } from '@/hooks/useToggle/useFavoriteList'
import type { UseToggleProperties } from '@/hooks/useToggle/useToggle-types'
import { userServices } from '@/services/user-service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useLayoutEffect, useState } from 'react'
import Toast from 'react-native-toast-message'

export const useToggle = (data: UseToggleProperties, invalidate?: [string]) => {
	const QueryClient = useQueryClient()
	const [isSmashed, setIsSmashed] = useState(false)
	const { favoriteList } = useFavoritesList(data.type)
	useLayoutEffect(() => {
		if (!favoriteList) return

		const isSome = favoriteList.some(f => f.id === data.id)

		if (isSmashed !== isSome) setIsSmashed(isSome)
	}, [favoriteList, isSmashed, data.id, data.type])

	const { mutateAsync: toggle } = useMutation(
		['toggle' + data.type, data.id],
		(properties: UseToggleProperties) =>
			userServices.toggle(properties.type, properties.id),
		{
			onSuccess: async ({ message }) => {
				console.log(invalidate)
				await QueryClient.invalidateQueries(['Favorite list'])
				if (invalidate) {
					await QueryClient.invalidateQueries({
						queryKey: invalidate
					})
				}
				Toast.show({
					type: 'success',
					text1: 'Success',
					text2: message
				})
			}
		}
	)

	const handleToggle = async () => {
		await toggle(data)
	}

	return { isSmashed, handleToggle }
}
