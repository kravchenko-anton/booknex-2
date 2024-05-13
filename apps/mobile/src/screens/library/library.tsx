import { useTypedNavigation } from '@/hooks'
import { ReadingList } from '@/screens/library/reading-list'
import { useReadingProgressStore } from '@/screens/reading/store/progress-store'
import { BookCard, Flatlist, Loader, ScrollLayout } from '@/ui'
import NothingFount from '@/ui/nothing-fount'

//TODO: сделать сихнронную историю
const Library = () => {
	const { navigate, isFocused } = useTypedNavigation()
	const library = useReadingProgressStore(
		state => state.getLibrary(),
		isFocused
	)
	if (!library) return <Loader />
	if (
		library.readingBooks.length === 0 &&
		library.savedBooks.length === 0 &&
		library.finishedBooks.length === 0
	)
		return (
			<NothingFount
				text={
					'You haven’t saved any books yet. \n' +
					'Go to the catalog and find something to read.'
				}
			/>
		)
	return (
		<ScrollLayout>
			<ReadingList data={library.readingBooks} navigate={navigate} />
			<Flatlist
				horizontal
				title='Saved to read'
				data={library.savedBooks}
				renderItem={({ item: book }) => (
					<BookCard
						size='sm'
						image={{ uri: book.picture }}
						author={book.author}
						onPress={() => navigate('Book', { slug: book.slug })}
					/>
				)}
			/>
			<Flatlist
				horizontal
				mt={5}
				className='mb-4'
				title='Finished'
				data={library.finishedBooks}
				renderItem={({ item: book }) => (
					<BookCard
						size='sm'
						image={{ uri: book.picture }}
						author={book.author}
						onPress={() => navigate('Book', { slug: book.slug })}
					/>
				)}
			/>
		</ScrollLayout>
	)
}

export default Library
