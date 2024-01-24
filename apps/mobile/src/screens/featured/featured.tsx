import { catalogService } from '@/shared/api/services/catalog/catalog-service'
import { useTypedNavigation } from '@/shared/hooks'
import { BookCard, Button, Flatlist, Loader, ScrollLayout } from '@/shared/ui'
import BannerList from '@/shared/ui/book-lists/banner-list'
import { useQuery } from '@tanstack/react-query'
//TODO: добавить тут shelves
const Featured = () => {
	const { data: featured } = useQuery(['featured'], () =>
		catalogService.featured()
	)
	const { navigate } = useTypedNavigation()
	if (!featured) return <Loader />
	return (
		<ScrollLayout>
			<BannerList
				title='Recommended for you'
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
				data={featured.relatedGenres}
				renderItem={({ item: genre }) => (
					<Button
						onPress={() => {
							navigate('Genre', { id: genre.id, name: genre.name })
						}}
						size='md'
						variant='foreground'
					>
						{genre.name}
					</Button>
				)}
			/>
			<BannerList
				mt={5}
				title='Popular books'
				horizontal
				data={featured.popularBooks}
				renderItem={({ item: book }) => (
					<BookCard
						size='md'
						onPress={() => navigate('Book', { id: book.id })}
						title={book.title}
						author={book.author.name}
						image={{
							uri: book.picture
						}}
					/>
				)}
			/>
			<Flatlist
				title='New releases'
				horizontal
				data={featured.newReleases}
				renderItem={({ item: book }) => (
					<BookCard
						size='md'
						onPress={() => navigate('Book', { id: book.id })}
						image={{
							uri: book.picture
						}}
					/>
				)}
			/>
			<BannerList
				title='Best selling books'
				data={featured.bestSellingBooks}
				renderItem={({ item: book }) => (
					<BookCard
						author={book.author.name}
						onPress={() => navigate('Book', { id: book.id })}
						size='md'
						image={{
							uri: book.picture
						}}
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
