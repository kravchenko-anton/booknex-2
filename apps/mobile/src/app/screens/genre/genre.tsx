import { BookCard, PressableContainer, RainbowBookCard } from '@/components'
import GenreLayout from '@/screens/genre/genre-layout'
import { useGenre } from '@/screens/genre/useGenre'
import { removeEmoji } from '@/utils/remove-emoji'
import { BigLoader, Flatlist, Image, Title } from 'ui/components'

const Genre = () => {
	const { navigate, genre } = useGenre()
	if (!genre) return <BigLoader />
	// TODO: возможно вынести всё flatlist в отдельный компонент
	return (
		<GenreLayout title={genre.name} transientValue={50}>
			<Flatlist
				horizontal
				title={{
					text: 'Best Sellers'
				}}
				data={genre.bestSellers}
				renderItem={({ item: book }) => (
					<BookCard
						title={book.title}
						image={{
							uri: book.picture,
							size: 'md'
						}}
						onPress={() => navigate.Book(book.id)}
					/>
				)}
			/>

			<Flatlist
				horizontal
				title={{
					text: 'Newest Books'
				}}
				data={genre.newestBooks}
				renderItem={({ item: book }) => (
					<RainbowBookCard
						title={book.title}
						image={{
							uri: book.picture
						}}
						description={book.description}
						onPress={() => navigate.Book(book.id)}
						backgroundColor={book.color}
					/>
				)}
			/>
			<Flatlist
				horizontal
				title={{
					text: 'Best Authors'
				}}
				data={genre.bestAuthors}
				renderItem={({ item: author }) => (
					<PressableContainer
						className='w-[120px]'
						onPress={() => navigate.Author(author.id)}
					>
						<Image url={author.picture} width={120} height={120} />
						<Title size={16} center weight='bold'>
							{author.name}
						</Title>
					</PressableContainer>
				)}
			/>
			{genre.bestSellersFromSimilar.map(simular => (
				<Flatlist
					key={simular.name}
					title={{
						text: removeEmoji(simular.name)
					}}
					horizontal
					mt={30}
					data={simular.majorBooks}
					renderItem={({ item: book }) => (
						<BookCard
							onPress={() => navigate.Book(book.id)}
							image={{
								uri: book.picture,
								size: 'md'
							}}
						/>
					)}
				/>
			))}
		</GenreLayout>
	)
}

export default Genre
