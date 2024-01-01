import { useToggle } from '@/hooks/useToggle/useToggle'
import { useTypedRoute } from '@/hooks/useTypedRoute'
import { bookService } from '@/services/book/book-service'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export const useBook = () => {
	const { params } = useTypedRoute<'Book'>()
	const { data: book } = useQuery(['book ', params.id], () =>
		bookService.infoById(+params.id)
	)
	const { handleToggle: toggleReadingBooks, isSmashed: isSmashedReadingBooks } =
		useToggle(
			{
				type: 'readingBooks',
				id: params.id
			},
			['library']
		)

	return useMemo(
		() => ({
			book,
			toggleReadingBooks,
			isSmashedReadingBooks
		}),
		[book, toggleReadingBooks, isSmashedReadingBooks]
	)
}
