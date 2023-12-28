import { useToggle } from '@/hooks/useToggle/useToggle'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { useTypedRoute } from '@/hooks/useTypedRoute'
import { bookService } from '@/services/book/book-service'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export const useBook = () => {
	const { navigate: navigateFunction, goBack } = useTypedNavigation()
	const { params } = useTypedRoute<'Book'>()
	const { data: book } = useQuery(['book ', params.id], () =>
		bookService.infoById(+params.id)
	)
	const { handleToggle: toggleReadingBooks, isSmashed: isSmashedReadingBooks } =
		useToggle(
			{
				type: 'books',
				id: params.id
			},
			['library']
		)

	const navigate = {
		reading: () => {
			navigateFunction('Reading', { id: params.id, epub: book?.file || '' })
		},
		genre: (id: number) => {
			navigateFunction('Genre', { id })
		},
		similar: (id: number) => {
			navigateFunction('Book', { id })
		},
		author: (id: number) => {
			navigateFunction('Author', { id })
		},
		back: () => {
			goBack()
		}
	}

	return useMemo(
		() => ({
			book,
			navigate,
			toggleReadingBooks,
			isSmashedReadingBooks
		}),
		[book, toggleReadingBooks, isSmashedReadingBooks]
	)
}
