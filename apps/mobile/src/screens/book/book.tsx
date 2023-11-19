import BookCard from '@/components/book-card/book-card'
import Button from '@/components/ui/button/button'
import Description from '@/components/ui/description/description'
import FlatList from '@/components/ui/flatlist/flatlist'
import AnimatedIcon from '@/components/ui/icon/animated-icon'
import Image from '@/components/ui/image/image'
import BigLoader from '@/components/ui/loader/big-loader'
import BookLayout from '@/screens/book/book-layout/book-layout'
import StatisticCard from '@/screens/book/statistic-card/statistic-card'
import { useBook } from '@/screens/book/useBook'
import { Color } from '@/utils/color'
import { View } from 'react-native'

const Book = () => {
	const {
		book,
		isSmashedReadingBooks,
		toggleReadingBooks,
		hamburgerMenuElements,
		navigate
	} = useBook()
	if (!book) return <BigLoader />
	return (
		<BookLayout
			title={book.title}
			backgroundColor={book.color}
			hamburgerMenuElements={hamburgerMenuElements}
			author={{
				...book.author,
				navigate: navigate.author
			}}>
			<View className='flex-row justify-between px-4'>
				<View className='flex-1 justify-between'>
					<StatisticCard
						description={'Duration'}
						icon={'clock'}
						count={`${Math.round(book.pages / 1.5 / 60)}h ${Math.round(
							(book.pages / 1.5) % 60
						)} min`}
					/>
					<StatisticCard
						description={'Pages'}
						icon={'book'}
						count={book.pages}
					/>
					<StatisticCard
						description={'Liked'}
						icon={'thumbsup'}
						count={`${book.likedPercentage}%`}
					/>
				</View>
				<Image
					url={book.picture}
					className='z-0 mt-[-50px]'
					height={260}
					width={170}
				/>
			</View>
			<View className='flex-row justify-between gap-2 px-4 pt-6'>
				<Button
					onPress={() => {
						navigate.reading()
					}}
					text={'Read'}
					size={'medium'}
					className='flex-1'
				/>
				<AnimatedIcon
					name={isSmashedReadingBooks ? 'x' : 'plus'}
					onPress={() => toggleReadingBooks()}
					size={'medium'}
					className='w-[50px]'
					variant={'outlined'}
					color={Color.primary}
				/>
			</View>
			<FlatList
				title={{
					text: 'About book',
					mb: 8
				}}
				horizontal
				px={16}
				data={book.genres}
				renderItem={({ item: genre }) => (
					<Button
						onPress={() => {
							navigate.genre(genre.id)
						}}
						variant={'ghost'}
						size={'small'}
						text={genre.name}
					/>
				)}
			/>
			<Description size={18} className='mt-2 px-4' weight={'light'}>
				{book.description}
			</Description>

			<FlatList
				data={book.similarBooks}
				horizontal
				px={16}
				title={{
					text: 'Similar books'
				}}
				renderItem={({ item: similarBook }) => (
					<BookCard
						onPress={() => {
							navigate.similar(similarBook.id)
						}}
						image={{ uri: similarBook.picture, size: 'medium' }}
					/>
				)}
			/>
		</BookLayout>
	)
}

export default Book
