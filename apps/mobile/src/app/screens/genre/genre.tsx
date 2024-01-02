import {
	BookCard,
	PressableContainer,
	RainbowBookCard,
	ScrollLayout
} from '@/components'
import { useGenre } from '@/screens/genre/useGenre'
import { removeEmoji } from '@/utils/remove-emoji'
import { StatusBar } from 'react-native'
import { Color } from 'ui/colors'
import { Flatlist, Image, Loader, Title } from 'ui/components'
import * as Header from '../../components/header/header'

const Genre = () => {
	const { navigate, genre } = useGenre()
	if (!genre) return <Loader />
	// TODO: возможно вынести всё flatlist в отдельный компонент
	return (
		<ScrollLayout>
			<Header.Head>
				<Header.Title text={genre.name} />
			</Header.Head>
			<StatusBar barStyle='light-content' backgroundColor={Color.background} />
			<Flatlist
				horizontal
				title={{
					text: 'Best Sellers'
				}}
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
						onPress={() => navigate.book(book.id)}
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
						onPress={() => navigate.author(author.id)}
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
							onPress={() => navigate.book(book.id)}
							size='md'
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

export default Genre
