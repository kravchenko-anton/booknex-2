import { ScrollLayout } from '@/components'
import BookCard from '@/components/book-card/book-card'
import { useTypedNavigation } from '@/hooks'
import { userServices } from '@/services/user/user-service'
import { useQuery } from '@tanstack/react-query'
import { Flatlist, Loader, Title } from 'ui/components'

const Library = () => {
	const { data: library } = useQuery(['user-library'], () =>
		userServices.library()
	)
	const { navigate } = useTypedNavigation()
	if (!library) return <Loader />
	return (
		<ScrollLayout className='p-2'>
			<Title size={26} weight='bold'>
				Library
			</Title>
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
		</ScrollLayout>
	)
}

export default Library
