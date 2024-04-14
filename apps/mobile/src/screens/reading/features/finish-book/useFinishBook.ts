import api from '@/api'
import { useTypedNavigation } from '@/hooks'
import { successToast } from '@/utils/toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface FinishBookProperties {
	slug: string
	onFinishComplete: () => void
}
export const useFinishBook = ({
	onFinishComplete,
	slug
}: FinishBookProperties) => {
	const { navigate } = useTypedNavigation()
	const queryClient = useQueryClient()
	const { mutateAsync: finishReading, isLoading: finishReadingLoading } =
		useMutation({
			mutationKey: ['finish-reading', slug],
			mutationFn: (slug: string) => api.user.finishReading(slug)
		})

	const onFinish = async () => {
		await finishReading(slug).then(() => {
			onFinishComplete()
			successToast('Book successfully finished')
			navigate('BookReview', {
				slug
			})
			queryClient.invalidateQueries({
				queryKey: ['user-library']
			})
		})
	}

	return {
		onFinish,
		finishReadingLoading
	}
}
