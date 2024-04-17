import api from '@/api'
import { useTypedNavigation, useTypedSelector } from '@/hooks'
import {
	AnimatedPress,
	BookCard,
	Flatlist,
	Image,
	Loader,
	ScrollLayout,
	Title
} from '@/ui'
import { settings } from '@/ui/book-card/settings'
import BannerList from '@/ui/book-lists/banner-list'
import NothingFount from '@/ui/nothing-fount'
import ProgressBar from '@/ui/progress-bar/progress-bar'
import { useQuery } from '@tanstack/react-query'
import { QueryKeys } from 'global/utils/query-keys'

const Library = () => {
	const { data: library } = useQuery({
		queryKey: QueryKeys.library,
		queryFn: () => api.user.library(),
		select: data => data.data
	})
	const { navigate } = useTypedNavigation()
	const { books } = useTypedSelector(state => state.readingProgress)
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
			<BannerList
				title='Continue reading'
				data={library.readingBooks}
				renderItem={({ item: book }) => (
					<AnimatedPress
						style={{
							width: settings.width.sm * 1.2
						}}
						onPress={() => navigate('Reader', { slug: book.slug })}>
						<Image
							width={settings.width.sm * 1.2}
							height={settings.height.sm * 1.3}
							url={book.picture}
							className='mb-2'
						/>
						<ProgressBar
							progress={
								Number(
									books.find(b => b.slug === book.slug)?.latestProgress.progress
								) / 100 ||
								// small progress  with index
								0
							}
						/>
						<Title numberOfLines={2} size='md' weight='medium' className='mt-1'>
							{book.title}
						</Title>
					</AnimatedPress>
				)}
			/>
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
