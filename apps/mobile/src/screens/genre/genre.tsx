import BookCard from '@/components/book-card/book-card'
import RainbowBookCard from '@/components/book-card/rainbow-book-card/rainbow-book-card'
import PressableContainer from '@/components/pressable-container/pressable-container'
import FlatList from '@/components/ui/flatlist/flatlist'
import Image from '@/components/ui/image/image'
import BigLoader from '@/components/ui/loader/big-loader'
import { Title } from '@/components/ui/title/title'
import GenreLayout from '@/screens/genre/genre-layout'
import { useGenre } from '@/screens/genre/useGenre'
import { removeEmoji } from '@/utils/remove-emoji'

const Genre = () => {
	const { navigate, genre } = useGenre()
	if (!genre) return <BigLoader />
	// TODO: возможно вынести всё flatlist в отдельный компонент
	return (
		<GenreLayout title={genre.name} transientValue={50}>
			<FlatList
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
							size: 'medium'
						}}
						onPress={() => navigate.Book(book.id)}
					/>
				)}
			/>

			<FlatList
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
			<FlatList
				horizontal
				title={{
					text: 'Best Authors'
				}}
				data={genre.bestAuthors}
				renderItem={({ item: author }) => (
					<PressableContainer
						className='w-[120px]'
						onPress={() => navigate.Author(author.id)}>
						<Image url={author.picture} width={120} height={120} />
						<Title size={16} center weight={'bold'}>
							{author.name}
						</Title>
					</PressableContainer>
				)}
			/>
			{genre.bestSellersFromSimilar.map(simular => (
				<FlatList
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
								size: 'medium'
							}}
						/>
					)}
				/>
			))}
		</GenreLayout>
	)
}

export default Genre
