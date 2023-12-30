import { ScrollLayout } from '@/components'
import BookCard from '@/components/book-card/book-card'
import { userServices } from '@/services/user/user-service'
import { useQuery } from '@tanstack/react-query'
import { Flatlist, Loader, Title } from 'ui/components'

const Library = () => {
	const { data: library } = useQuery(['user-library'], () =>
		userServices.library()
	)
	//TODO: Сделать тут карусели по типу headWay
	if (!library) return <Loader />
	return (
		<ScrollLayout className='p-2'>
			<Title size={26} weight='bold'>
				Library
			</Title>
			<Flatlist
				mt={25}
				horizontal
				className='mb-5'
				title={{
					text: 'Reading now'
				}}
				data={library.readingBooks}
				renderItem={({ item }) => (
					<BookCard
						size='sm'
						image={{ uri: item.picture }}
						title={item.title}
					/>
				)}
			/>
			<Flatlist
				mt={5}
				horizontal
				title={{
					text: 'Finished'
				}}
				data={library.finishedBooks}
				renderItem={({ item }) => (
					<BookCard
						size='sm'
						image={{ uri: item.picture }}
						title={item.title}
					/>
				)}
			/>
		</ScrollLayout>
	)
}

export default Library
