import { useTypedRoute } from '@/hooks/useTypedRoute'
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

	const { mutateAsync: startReadingBook, isLoading: startReadingLoading } =
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
				}
			}
		)

	const { data: isSaved } = useQuery(['isSaved book', params.id], () =>
		userServices.isSaved(+params.id)
	)
	console.log(isSaved)
	return {
		book,
		startReadingBook,
		startReadingLoading,
		toggleSavedLoading,
		toggleSaved,
		isSaved
	}
}
