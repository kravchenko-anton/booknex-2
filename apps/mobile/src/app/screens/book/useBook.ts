import { useTypedNavigation, useTypedRoute } from '@/hooks'
import { bookService } from '@/services/book/book-service'
import { userServices } from '@/services/user/user-service'
import { successToast } from '@/utils/toast'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useBook = () => {
	const { params } = useTypedRoute<'Book'>()

	const queryClient = useQueryClient()
	const { data: book } = useQuery(['book ', params.id], () =>
		bookService.infoById(+params.id)
	)
	const { navigate, goBack } = useTypedNavigation()

	const { mutateAsync: startReading, isLoading: startReadingLoading } =
		useMutation(['start reading book'], (id: number) =>
			userServices.startReading(id)
		)

	const { mutateAsync: toggleSaved, isLoading: toggleSavedLoading } =
		useMutation(
			['toggle saved book'],
			(id: number) => userServices.toggleSave(id),
			{
				onSuccess: async isSaved => {
					successToast(`Book ${isSaved ? 'saved' : 'removed from saved'}`)
					await queryClient.invalidateQueries(['isSaved book', params.id])
					await queryClient.invalidateQueries(['user-library'])
				}
			}
		)

	const { data: isSaved } = useQuery(['isSaved book', params.id], () =>
		userServices.isSaved(+params.id)
	)

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
