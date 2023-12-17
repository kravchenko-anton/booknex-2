import VerticalCard from '@/components/book-card/vertical-card/vertical-card'
import Layout from '@/components/layout/layout'
import Button from '@/components/ui/button/button'
import Field from '@/components/ui/field/field'
import FlatList from '@/components/ui/flatlist/flatlist'
import BigLoader from '@/components/ui/loader/big-loader'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { useSearch } from '@/screens/search/useSearch'
import { View } from 'react-native'

const Search = () => {
	const {
		searchTerm,
		books,
		booksLoading, searchExamples, searchExamplesLoading,
		control
	} = useSearch()
	const { navigate } = useTypedNavigation()
	return (
		<Layout className="h-full">
			<Field
				control={control}
				name="searchTerm"
				placeholder="Type something..."
			/>
			{searchTerm ? (
				<View className="flex-1">
					{booksLoading ? (
						<BigLoader />
					) : (
						<FlatList
							mt={0}
							keyExtractor={item => `$${item.id}`}
							className="w-full flex-grow"
							data={books}
							renderItem={({ item: book }) => (
								<VerticalCard
									image={{
										uri: book.picture,
										size: 'medium'
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
				<FlatList
					mt={0}
					keyExtractor={item => `#${item.id} - ${item.title}`}
					data={searchExamples}
					renderItem={({ item }) => (
						<Button
							size="large"
							className="items-start"
							variant="primary"
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
