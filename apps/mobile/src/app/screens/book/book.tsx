import { BookCard, ScrollLayout } from '@/components'
import {
	AnimatedIcon,
	Button,
	Description,
	Flatlist,
	Image,
	Loader,
	Title
} from '@/components/ui'
import { useBook } from '@/screens/book/useBook'
import { share } from '@/utils/share-function'
import { Color } from 'global/colors'
import { ArrowLeft, Bookmarked, Share, Text } from 'icons'
import { View } from 'react-native'

const Book = () => {
	const {
		book,
		isSaved,
		toggleSavedLoading,
		startReadingLoading,
		navigate,
		goBack,
		toggleSaved,
		startReadingBook
	} = useBook()
	if (!book) return <Loader />
	return (
		<ScrollLayout>
			<View className='z-50 items-center justify-between overflow-hidden rounded-b-3xl px-2 pb-6 pt-2'>
				<View className='mt-1 w-full flex-row items-start justify-between'>
					<AnimatedIcon
						variant='foreground'
						icon={ArrowLeft}
						size='sm'
						onPress={() => goBack()}
					/>
					<View>
						<AnimatedIcon
							variant='transparent'
							icon={Share}
							size='sm'
							onPress={() =>
								share(`${book.title} is a great book! Check it on Booknex!`)
							}
						/>
						<AnimatedIcon
							variant='transparent'
							icon={Bookmarked}
							fatness={2}
							disabled={toggleSavedLoading}
							size='sm'
							fill={!!isSaved}
							onPress={() => toggleSaved(book.id)}
						/>
					</View>
				</View>
				<Image className='-mt-16' url={book.picture} height={260} width={170} />
			</View>
			<View className='flex-1 flex-row items-center justify-between px-2 pt-4'>
				<View className='mr-4 flex-1'>
					<Title numberOfLines={2} weight='semiBold' size={25} className='mt-2'>
						{book.title}
					</Title>
					<Title
						numberOfLines={1}
						color={Color.gray}
						weight='regular'
						size={16}
						onPress={() => navigate('Author', { id: book.author.id })}
						className='mt-1'
					>
						{book.author.name}
					</Title>
				</View>
				<Button
					icon={Text}
					isLoading={startReadingLoading}
					className='rounded-xl'
					onPress={startReadingBook}
					variant='primary'
					size='sm'
				>
					Read
				</Button>
			</View>
			<Flatlist
				title='About book'
				horizontal
				data={book.genres}
				renderItem={({ item: genre }) => (
					<Button
						onPress={() => {
							navigate('Genre', { id: genre.id, name: genre.name })
						}}
						variant='foreground'
						size='sm'
					>
						{genre.name}
					</Button>
				)}
			/>
			<Description size={18} className='mt-2 px-2' weight='light'>
				{book.description}
			</Description>

			<Flatlist
				data={book.similarBooks}
				horizontal
				px={8}
				title='Similar books'
				renderItem={({ item: similarBook }) => (
					<BookCard
						size='md'
						onPress={() => {
							navigate('Book', { id: similarBook.id })
						}}
						image={{ uri: similarBook.picture }}
					/>
				)}
			/>
		</ScrollLayout>
	)
}

export default Book
