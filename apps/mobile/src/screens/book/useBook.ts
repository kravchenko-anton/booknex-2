import { useToggle } from '@/hooks/useToggle/useToggle'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { useTypedRoute } from '@/hooks/useTypedRoute'
import { bookService } from '@/services/book-service'
import type { HamburgerMenuElementType } from '@/types/global'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { Share } from 'react-native'

export const useBook = () => {
	const { navigate: navigateFunction } = useTypedNavigation()
	const { params } = useTypedRoute<'Book'>()
	const { data: book } = useQuery(['book ', params.id], () =>
		bookService.byId(+params.id)
	)
	const { handleToggle: toggleReadingBooks, isSmashed: isSmashedReadingBooks } =
		useToggle(
			{
				type: 'readingBooks',
				id: params.id
			},
			['library']
		)

	const hamburgerMenuElements: HamburgerMenuElementType[] = [
		// TODO: доделать список
		{
			title: isSmashedReadingBooks ? 'Delete' : 'Add',
			icon: isSmashedReadingBooks ? 'trash' : 'plus',
			onPress: () => toggleReadingBooks()
		},
		{
			title: 'Share',
			icon: 'share',
			onPress: () => {
				Share.share({
					message: `Wow! I see ${
						book?.title || 'amazing'
					} book on Booknex and I think you will like it too!`
				})
			}
		},
		{
			title: 'Report problem',
			icon: 'alert',
			onPress: () => {
				console.log('Report problem')
			}
		},
		{
			title: 'Write review',
			icon: 'pencil',
			onPress: () => {
				console.log('Write review')
			}
		}
	]

	const navigate = {
		reading: () => {
			navigateFunction('Reading', { id: params.id, epub: book?.epub || '' })
		},
		genre: (id: number) => {
			navigateFunction('Genre', { id })
		},
		similar: (id: number) => {
			navigateFunction('Book', { id })
		},
		author: (id: number) => {
			navigateFunction('Author', { id })
		}
	}

	return useMemo(
		() => ({
			book,
			navigate,
			hamburgerMenuElements,
			toggleReadingBooks,
			isSmashedReadingBooks
		}),
		[book, toggleReadingBooks, isSmashedReadingBooks]
	)
}
