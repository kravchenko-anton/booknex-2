import BookCard from '@/components/book-card/book-card'
import RainbowBookCard from '@/components/book-card/rainbow-book-card/rainbow-book-card'
import ScrollLayout from '@/components/layout/scroll-layout'
import { useTypedNavigation } from '@/hooks'
import RecommendationList from '@/screens/featured/recommendation-list/recommendation-list'
import ShelfCard from '@/screens/featured/shelf-card/shelf-card'
import { catalogService } from '@/services/catalog/catalog-service'
import { shelfService } from '@/services/shelf/shelf-service'
import { removeEmoji } from '@/utils/remove-emoji'
import { useQuery } from '@tanstack/react-query'
import { Button, Flatlist, Loader } from 'ui/components'

const Featured = () => {
	const { data: catalog } = useQuery(['catalog'], () =>
		catalogService.catalog()
	)
	const { data: shelves } = useQuery(['library', 'shelves'], () =>
		shelfService.catalog()
	)
	const { navigate } = useTypedNavigation()
	if (!catalog) return <Loader />
	return (
		<ScrollLayout>
			<Flatlist
				horizontal
				data={shelves}
				renderItem={({ item: shelve }) => (
					<ShelfCard
						onPress={() => navigate('Shelf', { id: shelve.id })}
						picture={shelve.picture}
						name={shelve.title}
					/>
				)}
			/>
			<RecommendationList
				data={catalog.recommendations}
				renderItem={({ item: book }) => (
					<BookCard
						onPress={() => navigate('Book', { id: book.id })}
						size='md'
						image={{
							uri: book.picture
						}}
						className='mr-4'
					/>
				)}
			/>
			<Flatlist
				horizontal
				data={catalog.mostRelatedGenres}
				renderItem={({ item: genre }) => (
					<Button
						onPress={() => navigate('Genre', { id: genre.id })}
						size='md'
						variant='foreground'
						text={genre.name}
						className='px-4'
					/>
				)}
			/>
			<Flatlist
				title={{
					text: 'Best Sellers'
				}}
				horizontal
				data={catalog.bestSellers}
				renderItem={({ item: book }) => (
					<BookCard
						onPress={() => navigate('Book', { id: book.id })}
						size='lg'
						image={{ uri: book.picture }}
						title={book.title}
					/>
				)}
			/>
			<Flatlist
				horizontal
				mt={20}
				title={{
					text: 'Popular Now'
				}}
				data={catalog.popularNow}
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
				title={{
					text: 'New Releases'
				}}
				horizontal
				data={catalog.newReleases}
				renderItem={({ item: book }) => (
					<BookCard
						size='md'
						onPress={() => navigate('Book', { id: book.id })}
						image={{ uri: book.picture }}
					/>
				)}
			/>
			{catalog.genres.map(genre => (
				<Flatlist
					key={genre.name}
					title={{
						text: removeEmoji(genre.name)
					}}
					horizontal
					mt={30}
					data={genre.books}
					renderItem={({ item: book }) => (
						<BookCard
							onPress={() => navigate('Book', { id: book.id })}
							size='sm'
							image={{
								uri: book.picture
							}}
						/>
					)}
				/>
			))}
		</ScrollLayout>
	)
}

export default Featured
