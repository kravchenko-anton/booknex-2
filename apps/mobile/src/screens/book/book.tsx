import { useBook } from '@/screens/book/useBook'
import {
	AnimatedIcon,
	Button,
	Description,
	Flatlist,
	Image,
	Loader,
	ScrollLayout,
	Title
} from '@/ui'
import { share } from '@/utils/share-function'
import { Color } from 'global/colors'
import { ArrowLeft, Bookmarked, Share, Text } from 'icons'
import type { FC } from 'react'
import { View } from 'react-native'

const Book: FC = () => {
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
	console.log(book.picture)
	return (
		<ScrollLayout>
			<View className='z-50 items-center justify-between overflow-hidden rounded-b-3xl px-2 pb-6 pt-2'>
				<View className='mt-1 w-full flex-row items-start justify-between'>
					<AnimatedIcon
						variant='foreground'
						icon={ArrowLeft}
						size='md'
						onPress={() => goBack()}
					/>
					<AnimatedIcon
						variant='foreground'
						icon={Share}
						size='md'
						onPress={() =>
							share(`${book.title} is a great book! Check it on Booknex!`)
						}
					/>
				</View>
				<Image className='-mt-8' url={book.picture} height={260} width={170} />
			</View>
			<View className=' px-2 pt-4'>
				<Title
					numberOfLines={2}
					weight='semiBold'
					size={'xxl'}
					className='mt-2'
				>
					{book.title}
				</Title>
				<Title
					numberOfLines={1}
					color={Color.gray}
					weight='regular'
					size={'md'}
					className='mt-1'
				>
					{book.author}
				</Title>
			</View>
			<View className='h-[65px] flex-row justify-between gap-2 px-2 pt-4'>
				<Button
					icon={Text}
					isLoading={startReadingLoading}
					className='flex-1'
					variant='primary'
					size='md'
					onPress={startReadingBook}
				>
					Start reading
				</Button>
				<AnimatedIcon
					variant='muted'
					icon={Bookmarked}
					fatness={2}
					disabled={toggleSavedLoading}
					size='sm'
					fill={!!isSaved}
					onPress={() => toggleSaved(book.id)}
				/>
			</View>
			<Flatlist
				horizontal
				title='About book'
				data={book.genres}
				renderItem={({ item: genre }) => (
					<Button
						variant='foreground'
						size='sm'
						onPress={() => {
							navigate('Genre', { id: genre.id, name: genre.name })
						}}
					>
						{genre.name}
					</Button>
				)}
			/>
			<Description size={18} className='mt-2 px-2 pb-8' weight='light'>
				{book.description}
			</Description>

			{/* <Flatlist */}
			{/* 	horizontal */}
			{/* 	data={book.similarBooks} */}
			{/* 	px={8} */}
			{/* 	title='Similar books' */}
			{/* 	renderItem={({ item: similarBook }) => ( */}
			{/* 		<BookCard */}
			{/* 			size='md' */}
			{/* 			image={{ uri: similarBook.picture }} */}
			{/* 			onPress={() => { */}
			{/* 				navigate('Book', { id: similarBook.id }) */}
			{/* 			}} */}
			{/* 		/> */}
			{/* 	)} */}

			{/* /> */}
		</ScrollLayout>
	)
}

export default Book
