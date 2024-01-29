import { bookService } from '@/shared/services/book/book-service'
import { successToast } from '@/shared/utils/toast'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { errorCatch } from 'global/utils/catch-error'

export const useQueries = ({ searchTerm = '', page = 0 }) => {
	const queryClient = useQueryClient()
	const { data: books } = useQuery({
		queryKey: ['books', searchTerm, page],
		queryFn: () =>
			bookService.all({
				searchTerm: searchTerm,
				page: +page
			})
	})
	const { mutateAsync: toggleVisible } = useMutation({
		mutationKey: ['toggle visible'],
		mutationFn: (id: number) => bookService.toggleVisible(id),
		onError(error: string) {
			errorCatch(error)
		},
		async onSuccess() {
			successToast('Book updated')
			await queryClient.invalidateQueries(['books', searchTerm, page])
		}
	})

	const { mutateAsync: deleteBook } = useMutation({
		mutationKey: ['delete book'],
		mutationFn: (id: number) => bookService.delete(id),
		onError(error: string) {
			errorCatch(error)
		},
		async onSuccess() {
			successToast('Book deleted')
			await queryClient.invalidateQueries(['books', searchTerm, page])
		}
	})
	return {
		books,
		deleteBook,
		toggleVisible
	}
}
