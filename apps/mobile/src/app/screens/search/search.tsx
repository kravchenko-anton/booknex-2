import VerticalCard from '@/components/book-card/vertical-card/vertical-card'
import Layout from '@/components/layout/layout'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { useSearch } from '@/screens/search/useSearch'
import { View } from 'react-native'
import { BigLoader, Button, Field, Flatlist } from 'ui/components'

const Search = () => {
	const {
		searchTerm,
		books,
		booksLoading,
		searchExamples,
		searchExamplesLoading,
		control
	} = useSearch()
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
						<BigLoader />
					) : (
						<Flatlist
							mt={0}
							keyExtractor={item => `$${item.id}`}
							className='w-full flex-grow'
							data={books}
							renderItem={({ item: book }) => (
								<VerticalCard
									image={{
										uri: book.picture,
										size: 'md'
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
			) : (searchExamplesLoading ? (
				<BigLoader />
			) : (
				<Flatlist
					mt={0}
					keyExtractor={item => `#${item.id} - ${item.title}`}
					data={searchExamples}
					renderItem={({ item }) => (
						<Button
							size='lg'
							className='items-start'
							variant='primary'
							onPress={() => {
								navigate(item.title ? 'Genre' : 'Book', {
									id: item.id
								})
							}}
							text={(item.title ?? item.title) || 'Unknown'}
						/>
					)}
				/>
			))}
		</Layout>
	)
}

export default Search
