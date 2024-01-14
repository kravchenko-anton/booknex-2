import { AnimatedPress, BookCard, RainbowBookCard } from '@/components'
import Layout from '@/components/layout/header-scroll-layout/header-scroll-layout'
import { Flatlist, Image, Loader, Title } from '@/components/ui'
import { useGenre } from '@/screens/genre/useGenre'

const Genre = () => {
	const { navigate, genre } = useGenre()
	if (!genre) return <Loader />
	// TODO: возможно вынести всё flatlist в отдельный компонент
	return (
		<Layout.Wrapper
			header={
				<Layout.Header>
					<Layout.BackWithTitle title={genre.name} />
				</Layout.Header>
			}
		>
			<Flatlist
				horizontal
				mt={0}
				title='Best Sellers'
				data={genre.bestSellers}
				renderItem={({ item: book }) => (
					<BookCard
						title={book.title}
						size='md'
						image={{
							uri: book.picture
						}}
						onPress={() => navigate.book(book.id)}
					/>
				)}
			/>

			<Flatlist
				horizontal
				title='Newest Books'
				data={genre.newestBooks}
				renderItem={({ item: book }) => (
					<RainbowBookCard
						title={book.title}
						image={{
							uri: book.picture
						}}
						description={book.description}
						onPress={() => navigate.book(book.id)}
						backgroundColor={book.color}
					/>
				)}
			/>
			<Flatlist
				horizontal
				title='Best Authors'
				data={genre.bestAuthors}
				renderItem={({ item: author }) => (
					<AnimatedPress
						className='w-[100px]'
						onPress={() => navigate.author(author.id)}
					>
						<Image url={author.picture} width={100} height={100} />
						<Title size={16} center weight='bold'>
							{author.name}
						</Title>
					</AnimatedPress>
				)}
			/>
			{genre.bestSellersFromSimilar.map(similar => (
				<Flatlist
					key={similar.name}
					title={similar.name}
					horizontal
					mt={30}
					data={similar.majorBooks}
					renderItem={({ item: book }) => (
						<BookCard
							onPress={() => navigate.book(book.id)}
							size='md'
							image={{
								uri: book.picture
							}}
						/>
					)}
				/>
			))}
		</Layout.Wrapper>
	)
}

export default Genre
