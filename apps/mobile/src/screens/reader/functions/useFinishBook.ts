import api from '@/api'
import { useTypedNavigation } from '@/hooks'
import { successToast } from '@/utils/toast'
import * as Sentry from '@sentry/react-native'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { MutationKeys, QueryKeys } from 'global/utils/query-keys'

export const useFinishBook = (onFinishComplete: () => void) => {
	const { navigate } = useTypedNavigation()
	const queryClient = useQueryClient()
	const { mutateAsync: finishReading, isPending: finishReadingLoading } =
		useMutation({
			mutationKey: MutationKeys.book.finishReading,
			mutationFn: (slug: string) => api.user.finishReading(slug)
		})

	const onFinish = async (slug: string) => {
		if (finishReadingLoading) return
		await finishReading(slug).then(() => {
			onFinishComplete()
			successToast('Successfully finished')
			navigate('BookImpression', {
				slug
			})
			queryClient.invalidateQueries({
				queryKey: QueryKeys.library
			})
			Sentry.metrics.increment('finish-reading')
		})
	}

	return {
		onFinish,
		finishReadingLoading
	}
}
