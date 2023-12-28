import { ScrollLayout } from '@/components'
import BookCard from '@/components/book-card/book-card'
import { userServices } from '@/services/user/user-service'
import { useQuery } from '@tanstack/react-query'
import { Flatlist, Loader, Title } from 'ui/components'

const Library = () => {
	const { data: library } = useQuery(['user-library'], () =>
		userServices.library()
	)
	// Сделать тут карусели по типу headWay
	if (!library) return <Loader />
	return (
		<ScrollLayout className='p-2'>
			<Title size={26} weight='bold'>
				My books
			</Title>
			<Flatlist
				mt={25}
				scrollEnabled={false}
				title={{
					text: 'Books'
				}}
				data={library.finishedBooks}
				renderItem={({ item }) => (
					<BookCard
						size='lg'
						image={{ uri: item.picture }}
						title={item.title}
					/>
				)}
			/>
			<Flatlist
				mt={25}
				className='mb-5'
				scrollEnabled={false}
				title={{
					text: 'Shelves'
				}}
				data={library.readingBooks}
				renderItem={({ item }) => (
					<BookCard
						size='lg'
						image={{ uri: item.picture }}
						title={item.title}
					/>
				)}
			/>
		</ScrollLayout>
	)
}

export default Library
