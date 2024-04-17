import api from '@/api'
import { AnimatedIcon } from '@/ui'
import { successToast } from '@/utils/toast'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { MutationKeys, QueryKeys } from 'global/utils/query-keys'
import { Bookmarked } from 'icons'
import type { FC } from 'react'

interface SaveButtonProperties {
	slug: string
}

const SaveButton: FC<SaveButtonProperties> = ({ slug }) => {
	const queryClient = useQueryClient()

	const { mutateAsync: toggleSave, isLoading: toggleSaveLoading } = useMutation(
		{
			mutationKey: MutationKeys.book.toggleSaveBySlug(slug),
			mutationFn: (slug: string) => api.user.toggleSave(slug),
			onSuccess: async ({ data: isSave }) => {
				successToast(`Book ${isSave ? 'saved' : 'removed from saved'}`)
				//TODO: проверить работоспособность и пофиксить
				await queryClient.invalidateQueries({
					queryKey: QueryKeys.book.isSaved(slug)
				})
				await queryClient.invalidateQueries({
					queryKey: QueryKeys.library
				})
			}
		}
	)

	const { data: isSaved } = useQuery({
		queryKey: QueryKeys.book.isSaved(slug),
		queryFn: () => api.user.isSaved(slug),
		select: data => data.data
	})

	return (
		<AnimatedIcon
			variant='muted'
			icon={Bookmarked}
			fatness={2}
			disabled={toggleSaveLoading}
			size='md'
			className='ml-3'
			fill={!!isSaved}
			onPress={() => toggleSave(slug)}
		/>
	)
}

export default SaveButton
