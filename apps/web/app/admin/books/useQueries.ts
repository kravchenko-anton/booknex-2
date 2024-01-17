import { bookService } from '@/services/book/book-service'
import { successToast } from '@/utils/toast'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { errorCatch } from 'global/utils/catch-error'

export const useQueries = ({ searchTerm = '', page = 0 }) => {
	const queryClient = useQueryClient()
	const { data: books = [] } = useQuery(['books', searchTerm, page], () =>
		bookService.all({
			page,
			searchTerm
		})
	)
	const { mutateAsync: toggleVisible } = useMutation(
		['update visible'],
		(id: number) => bookService.toggleVisible(id),
		{
			onError(error: string) {
				errorCatch(error)
			},
			async onSuccess() {
				successToast('Book visibility changed')
				await queryClient.invalidateQueries(['books', searchTerm, page])
			}
		}
	)

	const { mutateAsync: deleteBook } = useMutation(
		['delete book'],
		(id: number) => bookService.delete(id),
		{
			onError(error: string) {
				errorCatch(error)
			},
			async onSuccess() {
				successToast('Book deleted')
				await queryClient.invalidateQueries(['books', searchTerm, page])
			}
		}
	)
	return {
		books,
		deleteBook,
		toggleVisible
	}
}
