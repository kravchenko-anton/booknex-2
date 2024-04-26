import api from '@/api'
import { useTypedNavigation } from '@/hooks'
import ManageRecommendationMenu from '@/screens/update-recommendation/manage-recommendation-menu'
import { BookCard, Flatlist, Loader, ScrollLayout } from '@/ui'
import BannerList from '@/ui/book-lists/banner-list'
import { GenreElement } from '@/ui/genre-element'
import { useQuery } from '@tanstack/react-query'
import { QueryKeys } from 'global/utils/query-keys'

const Featured = () => {
	const { data: featured } = useQuery({
		queryKey: QueryKeys.featured,
		queryFn: () => api.catalog.featured(),
		select: data => data.data
	})
	const { navigate } = useTypedNavigation()
	if (!featured) return <Loader />
	return (
		<ScrollLayout>
			<BannerList
				title='Picks of the week'
				data={featured.picksOfWeek}
				renderItem={({ item: book }) => (
					<BookCard
						size='md'
						image={{
							uri: book.picture
						}}
						onPress={() => navigate('Book', { slug: book.slug })}
					/>
				)}
			/>

			<Flatlist
				horizontal
				data={featured.genres}
				renderItem={({ item: genre }) => (
					<GenreElement
						svgUri={genre.icon}
						title={genre.name}
						onPress={() =>
							navigate('Genre', { slug: genre.slug, name: genre.name })
						}
					/>
				)}
			/>
			<BannerList
				horizontal
				mt={5}
				title='Best selling books'
				data={featured.bestSellingBooks}
				renderItem={({ item: book }) => (
					<BookCard
						size='md'
						title={book.title}
						author={book.author}
						image={{
							uri: book.picture
						}}
						onPress={() => navigate('Book', { slug: book.slug })}
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
						onPress={() => navigate('Book', { slug: book.slug })}
					/>
				)}
			/>
			{featured.booksBySelectedGenres.map(list => (
				<BannerList
					key={list.length + Math.random()}
					className='mb-4'
					title='Best selling books'
					data={list}
					renderItem={({ item: book }) => (
						<BookCard
							author={book.author}
							size='md'
							image={{
								uri: book.picture
							}}
							onPress={() => navigate('Book', { slug: book.slug })}
						/>
					)}
				/>
			))}

			{
				// TODO: сделать колекцию,жанры относительно фаворитных жанров
			}
			<ManageRecommendationMenu
				onManagePress={() => navigate('UpdateRecommendation')}
			/>
		</ScrollLayout>
	)
}

export default Featured
