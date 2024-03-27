import api from '@/api'
import { AnimatedIcon } from '@/ui'
import { successToast } from '@/utils/toast'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Bookmarked } from 'icons'
import type { FC } from 'react'

interface SaveButtonProperties {
	id: number
}

const SaveButton: FC<SaveButtonProperties> = ({ id }) => {
	const queryClient = useQueryClient()

	const { mutateAsync: toggleSaved, isLoading: toggleSavedLoading } =
		useMutation({
			mutationKey: ['toggle-saved', id],
			mutationFn: (id: number) => api.user.toggleSave(id),
			onSuccess: async ({ data: isSave }) => {
				successToast(`Book ${isSave ? 'saved' : 'removed from saved'}`)
				await queryClient.invalidateQueries({
					queryKey: ['is-saved', +id]
				})
				await queryClient.invalidateQueries({
					queryKey: ['user-library']
				})
			}
		})

	const { data: isSaved } = useQuery({
		queryKey: ['is-saved', +id],
		queryFn: () => api.user.isSaved(+id),
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
			onPress={() => toggleSaved(id)}
		/>
	)
}

export default SaveButton
