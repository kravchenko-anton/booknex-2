import { bookService } from '@/shared/api/services'
import { userServices } from '@/shared/api/services/user/user-service'
import { useTypedNavigation, useTypedRoute } from '@/shared/hooks'
import { successToast } from '@/shared/utils/toast'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useBook = () => {
	const { params } = useTypedRoute<'Book'>()

	const queryClient = useQueryClient()
	const { data: book } = useQuery({
		queryKey: ['book', params.id],
		queryFn: () => bookService.infoById(+params.id)
	})
	const { navigate, goBack } = useTypedNavigation()

	const { mutateAsync: startReading, isLoading: startReadingLoading } =
		useMutation({
			mutationKey: ['start-reading', params.id],
			mutationFn: (id: number) => userServices.startReading(id)
		})

	const { mutateAsync: toggleSaved, isLoading: toggleSavedLoading } =
		useMutation({
			mutationKey: ['toggle-saved', params.id],
			mutationFn: (id: number) => userServices.toggleSave(id),
			onSuccess: async isSaved => {
				successToast(`Book ${isSaved ? 'saved' : 'removed from saved'}`)
				await queryClient.invalidateQueries(['isSaved book', params.id])
				await queryClient.invalidateQueries(['user-library'])
			}
		})

	const { data: isSaved } = useQuery({
		queryKey: ['is-saved', +params.id],
		queryFn: () => userServices.isSaved(+params.id)
	})

	const startReadingBook = async () => {
		await startReading(book.id).then(() => {
			queryClient.invalidateQueries(['user-library'])
			navigate('Reader', { id: book.id })
		})
	}
	return {
		book,
		navigate,
		goBack,
		startReadingBook,
		startReadingLoading,
		toggleSavedLoading,
		toggleSaved,
		isSaved
	}
}
