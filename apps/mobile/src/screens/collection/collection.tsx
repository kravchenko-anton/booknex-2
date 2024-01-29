import { collectionService } from '@/shared/api/services/collection/collection-service'
import { useTypedNavigation, useTypedRoute } from '@/shared/hooks'
import { BookCard, Description, Flatlist, Loader } from '@/shared/ui'
import { useQuery } from '@tanstack/react-query'
import { View } from 'react-native'

const Collection = () => {
	const { params } = useTypedRoute<'Collection'>()
	const { data: collection } = useQuery({
		queryKey: ['collection', params.id],
		queryFn: () => collectionService.byId(params.id)
	})

	const { navigate } = useTypedNavigation()
	if (!collection) return <Loader />
	return (
		<View>
			<View className='flex-row items-center justify-center gap-5 pt-4'></View>
			<View className='mx-2 mt-4 rounded-xl p-4'>
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
