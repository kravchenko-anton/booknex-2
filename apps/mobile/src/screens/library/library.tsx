import api from '@/api'
import { useTypedNavigation } from '@/hooks'
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

const Library = () => {
	const { data: library } = useQuery({
		queryKey: ['user-library'],
		queryFn: () => api.user.library(),
		select: data => data.data
	})
	const { navigate } = useTypedNavigation()
	console.log('library', library)
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
				renderItem={({ item }) => (
					//TODO: сделать с прогресс
					<AnimatedPress onPress={() => navigate('Reader', { id: item.id })}>
						<Image
							width={settings.width.sm * 1.2}
							height={settings.height.sm * 1.3}
							url={item.picture}
						/>
					</AnimatedPress>
				)}
			/>
			<Flatlist
				horizontal
				title='Saved to read'
				data={library.savedBooks}
				renderItem={({ item }) => (
					<BookCard
						size='sm'
						image={{ uri: item.picture }}
						author={item.author}
						onPress={() => navigate('Book', { id: item.id })}
					/>
				)}
			/>
			<Flatlist
				horizontal
				mt={5}
				className='mb-4'
				title='Finished'
				data={library.finishedBooks}
				renderItem={({ item }) => (
					<BookCard
						size='sm'
						image={{ uri: item.picture }}
						author={item.author}
						onPress={() => navigate('Book', { id: item.id })}
					/>
				)}
			/>
		</ScrollLayout>
	)
}

export default Library
