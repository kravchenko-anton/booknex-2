import VerticalCard from '@/components/book-card/vertical-card/vertical-card'
import Layout from '@/components/layout/layout'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { useSearch } from '@/screens/search/useSearch'
import { View } from 'react-native'
import { Field, Flatlist, Loader } from 'ui/components'
//TODO: переделать поиск под headway

const Search = () => {
	const { searchTerm, books, booksLoading, searchExamplesLoading, control } =
		useSearch()
	const { navigate } = useTypedNavigation()
	return (
		<Layout className='h-full'>
			<Field
				control={control}
				name='searchTerm'
				placeholder='Type something...'
			/>
			{searchTerm ? (
				<View className='flex-1'>
					{booksLoading ? (
						<Loader />
					) : (
						<Flatlist
							mt={0}
							keyExtractor={item => `$${item.id}`}
							className='mt-4 w-full flex-grow'
							data={books}
							renderItem={({ item: book }) => (
								<VerticalCard
									size='md'
									image={{
										uri: book.picture
									}}
									title={book.title}
									description={book.author.name}
									buttons={[
										{
											label: `📖 ${book.pages} pages`
										}
									]}
									onPress={() => {
										navigate('Book', { id: book.id })
									}}
								/>
							)}
						/>
					)}
				</View>
			) : (
				searchExamplesLoading && <Loader />
			)}
		</Layout>
	)
}

export default Search
