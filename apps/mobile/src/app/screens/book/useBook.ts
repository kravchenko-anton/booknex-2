import { useToggle } from '@/hooks/useToggle/useToggle'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { useTypedRoute } from '@/hooks/useTypedRoute'
import { bookService } from '@/services/book/book-service'
import type { HamburgerMenuElementType } from '@/types/global'
import { useQuery } from '@tanstack/react-query'
import { Alert, Pen, Plus, Share as ShareIcon, Trash } from 'icons'
import { useMemo } from 'react'
import { Share } from 'react-native'

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

	const hamburgerMenuElements: HamburgerMenuElementType[] = [
		// TODO: доделать список
		{
			title: isSmashedReadingBooks ? 'Delete' : 'Add',
			icon: isSmashedReadingBooks ? Trash : Plus,
			onPress: () => toggleReadingBooks()
		},
		{
			title: 'Share',
			icon: ShareIcon,
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
			icon: Alert,
			onPress: () => {
				console.log('Report problem')
			}
		},
		{
			title: 'Write review',
			icon: Pen,
			onPress: () => {
				console.log('Write review')
			}
		}
	]

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
			hamburgerMenuElements,
			toggleReadingBooks,
			isSmashedReadingBooks
		}),
		[book, toggleReadingBooks, isSmashedReadingBooks]
	)
}
