import { bookService } from '@/api/services'
import { userServices } from '@/api/services/user/user-service'
import { useTypedNavigation, useTypedRoute } from '@/hooks'
import { successToast } from '@/utils/toast'
import { HttpStatus } from '@nestjs/common'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { serverError } from 'backend/src/utils/call-error'
import { GlobalErrorsEnum } from 'backend/src/utils/errors'

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
				await queryClient.invalidateQueries({
					queryKey: ['is-saved', +params.id]
				})
				await queryClient.invalidateQueries({
					queryKey: ['user-library']
				})
			}
		})

	const { data: isSaved } = useQuery({
		queryKey: ['is-saved', +params.id],
		queryFn: () => userServices.isSaved(+params.id)
	})

	const startReadingBook = async () => {
		if (!book)
			throw serverError(HttpStatus.BAD_REQUEST, GlobalErrorsEnum.somethingWrong)
		await startReading(book.id)
		await queryClient
			.invalidateQueries({
				queryKey: ['user-library']
			})
			.then(() => navigate('Reader', { id: book.id }))
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
