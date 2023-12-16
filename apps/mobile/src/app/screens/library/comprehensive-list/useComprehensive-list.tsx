// import VerticalCard from '@/components/book-card/vertical-card/vertical-card'
// import { useTypedNavigation } from '@/hooks/useTypedNavigation'
// import { useTypedRoute } from '@/hooks/useTypedRoute'
// import { userServices } from '@/services/user/user-service'
// import { useQuery } from '@tanstack/react-query'
// import type { ListRenderItem } from 'react-native'
//
// export const useComprehensiveList = () => {
// 	const { navigate: navigateFunction } = useTypedNavigation()
// 	const { params } = useTypedRoute<'ComprehensiveList'>()
// 	const { data: library } = useQuery(
// 		['library', 'user-library' + params.type],
// 		() => userServices.(params.type)
// 	)
//
// 	const navigate = {
// 		book: (id: number) => {
// 			navigateFunction('Book', { id })
// 		},
// 		shelf: (id: number) => {
// 			navigateFunction('Shelf', { id })
// 		}
// 	}
//
// 	const listElement = {
// 		book: ({ item: book }: { item: ShortBookType }) => (
// 			<VerticalCard
// 				image={{
// 					uri: book.picture,
// 					size: 'medium'
// 				}}
// 				title={book.title}
// 				description={book.author.name}
// 				buttons={[
// 					{
// 						label: `👍 ${book.likedPercentage}% liked`
// 					}
// 				]}
// 				onPress={() => {
// 					navigate.book(book.id)
// 				}}
// 			/>
// 		),
// 		shelf: ({ item: shelf }: { item: ShortShelfType }) => (
// 			<VerticalCard
// 				title={shelf.title}
// 				image={{
// 					size: 'cube',
// 					uri: shelf.picture
// 				}}
// 				descriptionLines={2}
// 				description={`${shelf.description}`}
// 				onPress={() => {
// 					navigate.shelf(shelf.id)
// 				}}
// 			/>
// 		)
// 	}
//
// 	return {
// 		library,
// 		type: params.type,
// 		listElement: listElement[
// 			DesignationType[params.type] as 'book' | 'shelf'
// 			] as ListRenderItem<ShortShelfType | ShortBookType>
// 	}
// }
