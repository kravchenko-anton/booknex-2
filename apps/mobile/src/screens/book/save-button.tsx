import api from '@/api'
import { AnimatedIcon } from '@/ui'
import * as Sentry from '@sentry/react-native'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { MutationKeys, QueryKeys } from 'global/utils/query-keys'
import { Bookmarked } from 'icons'

import type { FC } from 'react'

interface SaveButtonProperties {
	slug: string
}

const SaveButton: FC<SaveButtonProperties> = ({ slug }) => {
	const queryClient = useQueryClient()

	const { mutateAsync: toggleSave, isPending: toggleSaveLoading } = useMutation(
		{
			mutationKey: MutationKeys.book.toggleSaveBySlug,
			mutationFn: (slug: string) => api.user.toggleSave(slug),
			onSuccess: async () => {
				await queryClient.invalidateQueries({
					queryKey: QueryKeys.book.isSaved(slug)
				})
				await queryClient.invalidateQueries({
					queryKey: QueryKeys.library
				})
				Sentry.metrics.increment('toggle-save')
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
