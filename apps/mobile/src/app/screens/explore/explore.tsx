import { BookCard, RainbowBookCard, ScrollLayout } from '@/components'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import SearchField from '@/screens/explore/search-field'
import { catalogService } from '@/services/catalog/catalog-service'
import { useQuery } from '@tanstack/react-query'
import { Flatlist, Loader } from 'ui/components'
//TODO: переделать поиск под headway

const Explore = () => {
	const { data: explore } = useQuery(['explore'], () =>
		catalogService.explore()
	)
	const { navigate } = useTypedNavigation()
	if (!explore) return <Loader />
	return (
		<ScrollLayout className='h-full'>
			<SearchField />
			<Flatlist
				title='Best Sellers'
				horizontal
				data={explore.bestSellers}
				renderItem={({ item: book }) => (
					<BookCard
						onPress={() => navigate('Book', { id: book.id })}
						size='lg'
						image={{ uri: book.picture }}
						author={book.author.name}
					/>
				)}
			/>
			<Flatlist
				horizontal
				mt={20}
				title='Popular Now'
				data={explore.popularNow}
				renderItem={({ item: book }) => (
					<RainbowBookCard
						onPress={() => navigate('Book', { id: book.id })}
						backgroundColor={book.color}
						image={{ uri: book.picture }}
						title={book.title}
						description={book.description}
					/>
				)}
			/>
			<Flatlist
				title='New Releases'
				horizontal
				data={explore.newReleases}
				renderItem={({ item: book }) => (
					<BookCard
						size='md'
						onPress={() => navigate('Book', { id: book.id })}
						image={{ uri: book.picture }}
					/>
				)}
			/>
		</ScrollLayout>
	)
}

export default Explore
