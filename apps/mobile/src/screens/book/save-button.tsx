import api from '@/api'
import { AnimatedIcon } from '@/ui'
import { successToast } from '@/utils/toast'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Bookmarked } from 'icons'
import type { FC } from 'react'

interface SaveButtonProperties {
	slug: string
}

const SaveButton: FC<SaveButtonProperties> = ({ slug }) => {
	const queryClient = useQueryClient()

	const { mutateAsync: toggleSaved, isLoading: toggleSavedLoading } =
		useMutation({
			mutationKey: ['toggle-saved', slug],
			mutationFn: (slug: string) => api.user.toggleSave(slug),
			onSuccess: async ({ data: isSave }) => {
				successToast(`Book ${isSave ? 'saved' : 'removed from saved'}`)
				await queryClient.invalidateQueries({
					queryKey: ['is-saved', slug]
				})
				await queryClient.invalidateQueries({
					queryKey: ['user-library']
				})
			}
		})

	const { data: isSaved } = useQuery({
		queryKey: ['is-saved', slug],
		queryFn: () => api.user.isSaved(slug),
		select: data => data.data
	})

	return (
		<AnimatedIcon
			variant='muted'
			icon={Bookmarked}
			fatness={2}
			disabled={toggleSavedLoading}
			size='md'
			className='ml-3'
			fill={!!isSaved}
			onPress={() => toggleSaved(slug)}
		/>
	)
}

export default SaveButton
