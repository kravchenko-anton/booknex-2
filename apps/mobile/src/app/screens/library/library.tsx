import BookCard from '@/components/book-card/book-card'
import Layout from '@/components/layout/header-scroll-layout/header-scroll-layout'
import { Flatlist, Loader } from '@/components/ui'
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
			<Flatlist
				mt={5}
				horizontal
				title='Reading now'
				data={library.readingBooks}
				renderItem={({ item }) => (
					<BookCard
						size='md'
						onPress={() => navigate('Book', { id: item.id })}
						image={{ uri: item.picture }}
						author={item.author.name}
					/>
				)}
			/>
			<Flatlist
				horizontal
				title='Want to read'
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
