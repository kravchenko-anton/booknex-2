import { useTypedNavigation } from '@/hooks'
import { ReadingList } from '@/screens/library/reading-list'
import {
	useReadingProgressStore,
	type libraryType
} from '@/screens/reading/store/progress-store'
import { BookCard, Flatlist, Loader, ScrollLayout, Title } from '@/ui'
import NothingFount from '@/ui/nothing-fount'
import { Color } from 'global/colors'
import { useEffect, useState } from 'react'
import { RefreshControl } from 'react-native'

const Library = () => {
	const { navigate } = useTypedNavigation()
	const [library, setLibrary] = useState<libraryType>(null)
	const {
		getLibrary,
		clearHistory,
		history,
		library: storeLibrary
	} = useReadingProgressStore(state => ({
		getLibrary: state.getLibrary,
		library: state.library,
		history: state.history,
		clearHistory: state.clearHistory
	}))
	console.log('history', history)
	useEffect(() => {
		const parsingLibrary = getLibrary()
		if (parsingLibrary) setLibrary(parsingLibrary)
	}, [getLibrary, storeLibrary, setLibrary])

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
		<ScrollLayout
			refreshControl={
				<RefreshControl
					refreshing={false}
					colors={[Color.white]}
					progressBackgroundColor={Color.transparent}
				/>
			}>
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
			<Title numberOfLines={100_000} className='mb-4'>
				{JSON.stringify(library.readingBooks)}
			</Title>
		</ScrollLayout>
	)
}

export default Library
