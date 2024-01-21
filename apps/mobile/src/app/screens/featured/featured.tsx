import BookCard from '@/components/book-card/book-card'
import Layout from '@/components/layout/header-scroll-layout/header-scroll-layout'
import BannerList from '@/components/lists/banner-list/banner-list'
import { Button, Flatlist, Loader } from '@/components/ui'
import { useTypedNavigation } from '@/hooks'
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
		</Layout.Wrapper>
	)
}

export default Featured
