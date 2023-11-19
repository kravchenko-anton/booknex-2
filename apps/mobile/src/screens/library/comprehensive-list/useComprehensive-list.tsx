import VerticalCard from '@/components/book-card/vertical-card/vertical-card'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { useTypedRoute } from '@/hooks/useTypedRoute'
import type { ShortBookType } from '@/services/types/book-service-types'
import type { ShortShelfType } from '@/services/types/shelf-service-types'
import { DesignationType } from '@/services/types/user-services-types'
import { userServices } from '@/services/user-service'
import { useQuery } from '@tanstack/react-query'
import type { ListRenderItem } from 'react-native'

export const useComprehensiveList = () => {
	const { navigate: navigateFunction } = useTypedNavigation()
	const { params } = useTypedRoute<'ComprehensiveList'>()
	const { data: library } = useQuery(
		['library', 'user-library' + params.type],
		() => userServices.getMore(params.type)
	)

	const navigate = {
		Book: (id: number) => {
			navigateFunction('Book', { id })
		},
		Shelf: (id: number) => {
			navigateFunction('Shelf', { id })
		}
	}

	const listElement = {
		book: ({ item: book }: { item: ShortBookType }) => (
			<VerticalCard
				image={{
					uri: book.picture,
					size: 'medium'
				}}
				title={book.title}
				description={book.author.name}
				buttons={[
					{
						label: `👍 ${book.likedPercentage}% liked`
					}
				]}
				onPress={() => {
					navigate.Book(book.id)
				}}
			/>
		),
		shelf: ({ item: shelf }: { item: ShortShelfType }) => (
			<VerticalCard
				title={shelf.title}
				image={{
					size: 'cube',
					uri: shelf.picture
				}}
				descriptionLines={2}
				description={`${shelf.description}`}
				onPress={() => {
					navigate.Shelf(shelf.id)
				}}
			/>
		)
	}

	return {
		library,
		type: params.type,
		listElement: listElement[
			DesignationType[params.type] as 'book' | 'shelf'
		] as ListRenderItem<ShortShelfType | ShortBookType>
	}
}
