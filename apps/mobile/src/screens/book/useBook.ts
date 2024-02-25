import api from '@/api'
import { useTypedNavigation, useTypedRoute } from '@/hooks'
import { successToast } from '@/utils/toast'
import { HttpStatus } from '@nestjs/common'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { GlobalErrorsEnum } from 'backend/src/utils/common/errors'
import { serverError } from 'backend/src/utils/helpers/call-error'

export const useBook = () => {
	const { params } = useTypedRoute<'Book'>()

	const queryClient = useQueryClient()
	const { data: book } = useQuery({
		queryKey: ['book', params.id],
		queryFn: () => api.book.infoById(+params.id),
		select: data => data.data
	})
	const { navigate, goBack } = useTypedNavigation()

	const { mutateAsync: startReading, isLoading: startReadingLoading } =
		useMutation({
			mutationKey: ['start-reading', params.id],
			mutationFn: (id: number) => api.user.startReading(id)
		})

	const { mutateAsync: toggleSaved, isLoading: toggleSavedLoading } =
		useMutation({
			mutationKey: ['toggle-saved', params.id],
			mutationFn: (id: number) => api.user.toggleSave(id),
			onSuccess: async ({ data: isSave }) => {
				successToast(`Book ${isSave ? 'saved' : 'removed from saved'}`)
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
		queryFn: () => api.user.isSaved(+params.id),
		select: data => data.data
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
