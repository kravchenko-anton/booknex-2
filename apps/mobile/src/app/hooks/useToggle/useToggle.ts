import type { UseToggleProperties } from '@/hooks/useToggle/types'
import { useFavoritesList } from '@/hooks/useToggle/useFavoriteList'
import { userServices } from '@/services/user/user-service'
import { successToast } from '@/utils/toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useLayoutEffect, useState } from 'react'

export const useToggle = (data: UseToggleProperties, invalidate?: [string]) => {
	const QueryClient = useQueryClient()
	const [isSmashed, setIsSmashed] = useState(false)
	const { favoriteList } = useFavoritesList(data.type)
	useLayoutEffect(() => {
		if (!favoriteList) return

		const isSome = favoriteList.includes(data.id)

		if (isSmashed !== isSome) setIsSmashed(isSome)
	}, [favoriteList, isSmashed, data.id, data.type])

	const { mutateAsync: toggle } = useMutation(
		['toggle' + data.type, data.id],
		(properties: UseToggleProperties) =>
			userServices.toggle(properties.id, properties.type),
		{
			onSuccess: async ({ message }) => {
				console.log(invalidate)
				await QueryClient.invalidateQueries(['Favorite list'])
				if (invalidate) {
					await QueryClient.invalidateQueries({
						queryKey: invalidate
					})
				}
				successToast(message)
			}
		}
	)

	const handleToggle = async () => {
		await toggle(data)
	}

	return { isSmashed, handleToggle }
}
