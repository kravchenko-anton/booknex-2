import BookCard from '@/components/book-card/book-card'
import ScrollLayout from '@/components/layout/scroll-layout'
import { useTypedNavigation } from '@/hooks'
import RecommendationList from '@/screens/featured/recommendation-list/recommendation-list'
import { catalogService } from '@/services/catalog/catalog-service'
import { useQuery } from '@tanstack/react-query'
import { Button, Flatlist, Loader } from 'ui/components'
//TODO: добавить тут shelves
const Featured = () => {
	const { data: featured } = useQuery(['featured'], () =>
		catalogService.featured()
	)

	const { navigate } = useTypedNavigation()
	if (!featured) return <Loader />
	return (
		<ScrollLayout>
			<RecommendationList
				data={featured.recommendations}
				renderItem={({ item: book }) => (
					<BookCard
						onPress={() => navigate('Book', { id: book.id })}
						size='md'
						image={{
							uri: book.picture
						}}
					/>
				)}
			/>
			<Flatlist
				horizontal
				title={{
					text: 'Your favorite genres'
				}}
				data={featured.relatedGenres}
				renderItem={({ item: genre }) => (
					<Button
						onPress={() => {
							navigate('Genre', { id: genre.id })
						}}
						size='md'
						variant='foreground'
						text={genre.name}
						className='px-4'
					/>
				)}
			/>

			{
				// TODO: сделать колекцию, обновление своих рекомендаций, жанры относительно фаворитных жанров
			}
		</ScrollLayout>
	)
}

export default Featured
