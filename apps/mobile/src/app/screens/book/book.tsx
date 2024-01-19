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
import { useTypedNavigation } from '@/hooks'
import { useBook } from '@/screens/book/useBook'
import { Color } from 'global/colors'
import { ArrowLeft, Text } from 'icons'
import { View } from 'react-native'

const Book = () => {
	const { book, startReadingLoading, startReadingBook } = useBook()
	const { navigate, goBack } = useTypedNavigation()
	if (!book) return <Loader />
	return (
		<ScrollLayout>
			<View className='z-50 items-center justify-between overflow-hidden rounded-b-3xl px-4 pb-6 pt-2'>
				<View className='mt-1 w-full flex-row items-center justify-between'>
					<AnimatedIcon
						variant='shade'
						icon={ArrowLeft}
						size='sm'
						onPress={() => goBack()}
					/>
				</View>
				<Image className='-z-10' url={book.picture} height={260} width={170} />
			</View>
			<View className='flex-1 flex-row items-center justify-between px-4 pt-6'>
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
					onPress={async () => {
						await startReadingBook(book.id).then(() => {
							navigate('Reader', { id: book.id })
						})
					}}
					variant='primary'
					size='sm'
				>
					Read
				</Button>
			</View>
			<Flatlist
				title='About book'
				horizontal
				px={16}
				data={book.genres}
				renderItem={({ item: genre }) => (
					<Button
						onPress={() => {
							navigate('Genre', { id: genre.id })
						}}
						variant='shade'
						size='sm'
					>
						{genre.name}
					</Button>
				)}
			/>
			<Description size={18} className='mt-2 px-4' weight='light'>
				{book.description}
			</Description>

			<Flatlist
				data={book.similarBooks}
				horizontal
				px={16}
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
