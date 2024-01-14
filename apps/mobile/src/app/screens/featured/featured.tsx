import BookCard from '@/components/book-card/book-card'
import Layout from '@/components/layout/header-scroll-layout/header-scroll-layout'
import { Button, Flatlist, Loader } from '@/components/ui'
import { useTypedNavigation } from '@/hooks'
import RecommendationList from '@/screens/featured/recommendation-list/recommendation-list'
import { catalogService } from '@/services/catalog/catalog-service'
import { useQuery } from '@tanstack/react-query'
import { Search } from 'icons'
//TODO: добавить тут shelves
const Featured = () => {
	const { data: featured } = useQuery(['featured'], () =>
		catalogService.featured()
	)
	const { navigate } = useTypedNavigation()
	if (!featured) return <Loader />
	return (
		<Layout.Wrapper
			header={
				<Layout.Header>
					<Layout.Logo className='pl-2' />
					<Layout.Icon
						icon={Search}
						className='px-2'
						onPress={() => navigate('Search')}
					/>
				</Layout.Header>
			}
		>
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
				title='Your favorite genres'
				data={featured.relatedGenres}
				renderItem={({ item: genre }) => (
					<Button
						onPress={() => {
							navigate('Genre', { id: genre.id })
						}}
						size='md'
						variant='foreground'
					>
						{genre.name}
					</Button>
				)}
			/>

			{
				// TODO: сделать колекцию, обновление своих рекомендаций, жанры относительно фаворитных жанров
			}
		</Layout.Wrapper>
	)
}

export default Featured
