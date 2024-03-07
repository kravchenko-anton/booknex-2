import api from '@/api'
import { useTypedNavigation, useTypedSelector } from '@/hooks'
import {
	AnimatedPress,
	BookCard,
	Flatlist,
	Image,
	Loader,
	ScrollLayout
} from '@/ui'
import { settings } from '@/ui/book-card/settings'
import BannerList from '@/ui/book-lists/banner-list'
import NothingFount from '@/ui/nothing-fount'
import { useQuery } from '@tanstack/react-query'
import { Color } from 'global/colors'
import { View } from 'react-native'

const Library = () => {
	const { data: library } = useQuery({
		queryKey: ['user-library'],
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
					//TODO: сделать с прогресс
					<AnimatedPress onPress={() => navigate('Reader', { id: book.id })}>
						<Image
							width={settings.width.sm * 1.2}
							height={settings.height.sm * 1.3}
							url={book.picture}
							className='mb-1'
						/>
						<View
							className='absolute'
							style={{
								bottom: 0,
								left: 0,
								right: 0,
								zIndex: 50
							}}
						>
							<View
								className='relative w-full'
								style={{
									backgroundColor: Color.primary
								}}
							>
								<View
									className=' absolute bottom-0 left-0 h-1 rounded-full'
									style={{
										backgroundColor: Color.primary,
										width: `${
											books.find(b => b.id === book.id)?.latestProgress
												.progress || 10
										}%`
									}}
								/>
							</View>
						</View>
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
						onPress={() => navigate('Book', { id: book.id })}
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
						onPress={() => navigate('Book', { id: book.id })}
					/>
				)}
			/>
		</ScrollLayout>
	)
}

export default Library
