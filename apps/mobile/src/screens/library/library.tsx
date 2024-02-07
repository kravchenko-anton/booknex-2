import { userServices } from '@/api/services/user/user-service'
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
import { useQuery } from '@tanstack/react-query'

const Library = () => {
	const { data: library } = useQuery({
		queryKey: ['user-library'],
		queryFn: () => userServices.library()
	})
	const { navigate } = useTypedNavigation()
	if (!library) return <Loader />
	return (
		<ScrollLayout>
			<BannerList
				title='Continue reading'
				data={library.readingBooks}
				renderItem={({ item }) => (
					//TODO: сделать спрогресс
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
