import { AnimatedPress } from '@/components'
import BannerList from '@/components/banner-list/banner-list'
import BookCard from '@/components/book-card/book-card'
import { settings } from '@/components/book-card/settings'
import Layout from '@/components/layout/header-scroll-layout/header-scroll-layout'
import { Flatlist, Image, Loader } from '@/components/ui'
import { useTypedNavigation } from '@/hooks'
import { userServices } from '@/services/user/user-service'
import { useQuery } from '@tanstack/react-query'

const Library = () => {
	const { data: library } = useQuery(['user-library'], () =>
		userServices.library()
	)
	const { navigate } = useTypedNavigation()
	if (!library) return <Loader />
	return (
		<Layout.Wrapper
			header={
				<Layout.Header>
					<Layout.BackWithTitle title='Library' />
				</Layout.Header>
			}
		>
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
						onPress={() => navigate('Book', { id: item.id })}
						image={{ uri: item.picture }}
						author={item.author.name}
					/>
				)}
			/>
			<Flatlist
				mt={5}
				className='mb-4'
				horizontal
				title='Finished'
				data={library.finishedBooks}
				renderItem={({ item }) => (
					<BookCard
						size='sm'
						onPress={() => navigate('Book', { id: item.id })}
						image={{ uri: item.picture }}
						author={item.author.name}
					/>
				)}
			/>
		</Layout.Wrapper>
	)
}

export default Library
