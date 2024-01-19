import { useTypedRoute } from '@/hooks/useTypedRoute'
import { bookService } from '@/services/book/book-service'
import { userServices } from '@/services/user/user-service'
import { useMutation, useQuery } from '@tanstack/react-query'
import { errorToast } from '../../../../../web/utils/toast'

export const useBook = () => {
	const { params } = useTypedRoute<'Book'>()
	const { data: book } = useQuery(['book ', params.id], () =>
		bookService.infoById(+params.id)
	)

	const { mutateAsync: startReadingBook, isLoading: startReadingLoading } =
		useMutation(
			['start reading book'],
			(id: number) => userServices.startReading(id),
			{
				onError: () => errorToast('An error occurred while starting the book')
			}
		)

	return {
		book,
		startReadingBook,
		startReadingLoading
	}
}
