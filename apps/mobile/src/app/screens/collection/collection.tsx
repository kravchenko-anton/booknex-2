import { BookCard } from '@/components'
import { useTypedNavigation, useTypedRoute } from '@/hooks'
import { collectionService } from '@/services/collection/collection-service'
import { useQuery } from '@tanstack/react-query'
import { View } from 'react-native'
import { Description, Flatlist, Loader } from 'ui/components'

const Collection = () => {
	const { params } = useTypedRoute<'Collection'>()
	const { data: collection } = useQuery(
		['library', 'collection', params.id],
		() => collectionService.byId(params.id)
	)

	const { navigate } = useTypedNavigation()
	if (!collection) return <Loader />
	return (
		<View>
			<View className='flex-row items-center justify-center gap-5 pt-4'></View>
			<View className='bg-pale mx-2 mt-4  rounded-md p-4'>
				<Description defaultSentences={2} size={22} weight='regular'>
					{collection.description}
				</Description>
			</View>

			<Flatlist
				horizontal
				data={collection.books}
				scrollEnabled={false}
				className='mb-2 px-2'
				renderItem={({ item: book }) => (
					<BookCard
						size='md'
						image={{
							uri: book.picture
						}}
						title={book.title}
						onPress={() => {
							navigate('Book', { id: book.id })
						}}
					/>
				)}
			/>
		</View>
	)
}

export default Collection
