import api from '@/api'
import { useTypedNavigation } from '@/hooks'
import { useReadingProgressStore } from '@/screens/reading/store/progress-store'
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
import { useNetInfo } from '@react-native-community/netinfo'
import { useQuery } from '@tanstack/react-query'
import { QueryKeys } from 'global/utils/query-keys'
//TODO: сделать сихнронную историю
const Library = () => {
	const { history, clearHistory } = useReadingProgressStore()
	console.log('actual history', history)
	const { data: library, isLoading } = useQuery({
		queryKey: QueryKeys.library,
		queryFn: () =>
			api.user.library(
				history.map(b => ({
					...b,
					startDate: b.startDate as unknown as string,
					endDate: b.endDate as unknown as string
				}))
			),
		select: data => data.data,
		staleTime: 0,
		refetchOnWindowFocus: true,
		refetchOnMount: true,
		retry: history.length > 0,
		onSuccess: () => {
			console.log('sync success, clear history', history)
			clearHistory()
		}
	})
	console.log('isLoading', isLoading, 'library')
	const { isConnected } = useNetInfo()
	const { navigate } = useTypedNavigation()
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
				renderItem={({ item: book }) => {
					const progress =
						isConnected && !history.some(b => b.bookSlug === book.slug)
							? (book.readingHistory?.progress || 0) / 100
							: (history.find(b => b.bookSlug === book.slug)?.progress || 0) /
								100
					const scrollPosition =
						isConnected && !history.some(b => b.bookSlug === book.slug)
							? book.readingHistory?.scrollPosition
							: history.find(b => b.bookSlug === book.slug)?.scrollPosition || 0
					console.log(`progress from ${book.title} |`, progress, scrollPosition)
					return (
						<AnimatedPress
							style={{
								width: settings.width.md
							}}
							onPress={() =>
								navigate('Reader', {
									slug: book.slug,
									initialScrollPosition: scrollPosition || 0
								})
							}>
							<Image
								width={settings.width.md}
								height={settings.height.md}
								url={book.picture}
								className='mb-2'
							/>
							<ProgressBar progress={progress} />
							<Title
								numberOfLines={2}
								size='md'
								weight='medium'
								className='mt-1'>
								{book.title}
							</Title>
						</AnimatedPress>
					)
				}}
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
