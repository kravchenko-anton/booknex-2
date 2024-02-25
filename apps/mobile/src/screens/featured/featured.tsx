import api from '@/api'
import { useTypedNavigation } from '@/hooks'
import ManageRecommendationMenu from '@/screens/update-recommendation/manage-recommendation-menu'
import { BookCard, Button, Flatlist, Loader, ScrollLayout } from '@/ui'
import BannerList from '@/ui/book-lists/banner-list'
import { useQuery } from '@tanstack/react-query'
//TODO: добавить тут shelves
const Featured = () => {
	const { data: featured } = useQuery({
		queryKey: ['featured'],
		queryFn: () => api.catalog.featured(),
		select: data => data.data
	})
	const { navigate } = useTypedNavigation()
	if (!featured) return <Loader />
	return (
		<ScrollLayout>
			<BannerList
				title='Recommended for you'
				data={featured.recommendations}
				renderItem={({ item: book }) => (
					<BookCard
						size='md'
						image={{
							uri: book.picture
						}}
						onPress={() => navigate('Book', { id: book.id })}
					/>
				)}
			/>
			<Flatlist
				horizontal
				data={featured.relatedGenres}
				renderItem={({ item: genre }) => (
					<Button
						size='md'
						variant='foreground'
						onPress={() => {
							navigate('Genre', { id: genre.id, name: genre.name })
						}}
					>
						{genre.name}
					</Button>
				)}
			/>
			<BannerList
				horizontal
				mt={5}
				title='Popular books'
				data={featured.popularBooks}
				renderItem={({ item: book }) => (
					<BookCard
						size='md'
						title={book.title}
						author={book.author}
						image={{
							uri: book.picture
						}}
						onPress={() => navigate('Book', { id: book.id })}
					/>
				)}
			/>
			<Flatlist
				horizontal
				title='New releases'
				data={featured.newReleases}
				renderItem={({ item: book }) => (
					<BookCard
						size='md'
						image={{
							uri: book.picture
						}}
						onPress={() => navigate('Book', { id: book.id })}
					/>
				)}
			/>
			<BannerList
				className='mb-4'
				title='Best selling books'
				data={featured.bestSellingBooks}
				renderItem={({ item: book }) => (
					<BookCard
						author={book.author}
						size='md'
						image={{
							uri: book.picture
						}}
						onPress={() => navigate('Book', { id: book.id })}
					/>
				)}
			/>
			{
				// TODO: сделать колекцию, обновление своих рекомендаций, жанры относительно фаворитных жанров
			}
			<ManageRecommendationMenu
				onManagePress={() => navigate('UpdateRecommendation')}
			/>
		</ScrollLayout>
	)
}

export default Featured
