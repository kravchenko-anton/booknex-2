import api from '@/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { MutationKeys, QueryKeys } from 'global/utils/query-keys'

interface FinishBookProperties {
	onFinishComplete?: () => void
}
export const useFinishBook = ({ onFinishComplete }: FinishBookProperties) => {
	const queryClient = useQueryClient()
	const { mutateAsync: finishReading, isPending: finishReadingLoading } =
		useMutation({
			mutationKey: MutationKeys.book.finishReading,
			mutationFn: (slug: string) => api.user.finishReading(slug)
		})

	const onFinish = async (slug: string) => {
		await finishReading(slug).then(() => {
			if (onFinishComplete) {
				onFinishComplete()
			}
			queryClient.invalidateQueries({
				queryKey: QueryKeys.library
			})
		})
	}

	return {
		onFinish,
		finishReadingLoading
	}
}
