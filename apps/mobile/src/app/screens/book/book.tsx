import { useBook } from '@/screens/book/useBook'

import { View } from 'react-native'
import { BigLoader, Button, Description, Flatlist, Image } from 'ui/components'

const Book = () => {
	const { book, hamburgerMenuElements, navigate } = useBook()
	if (!book) return <BigLoader />
	return (
		<View>
			<View className='flex-row justify-between px-4'>
				<View className='flex-1 justify-between'></View>
				<Image url={book.picture} className='z-0' height={260} width={170} />
			</View>
			<View className='flex-row justify-between gap-2 px-4 pt-6'>
				<Button
					onPress={() => {
						navigate.reading()
					}}
					text='Read'
					size='md'
					className='flex-1'
				/>
			</View>
			<Flatlist
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
						variant='shade'
						size='sm'
						text={genre.name}
					/>
				)}
			/>
			<Description size={18} className='mt-2 px-4' weight='light'>
				{book.description}
			</Description>

			{/* <FlatList */}
			{/* 	data={book.similarBooks} */}
			{/* 	horizontal */}
			{/* 	px={16} */}
			{/* 	title={{ */}
			{/* 		text: 'Similar books' */}
			{/* 	}} */}
			{/* 	renderItem={({ item: similarBook }) => ( */}
			{/* 		<BookCard */}
			{/* 			onPress={() => { */}
			{/* 				navigate.similar(similarBook.id) */}
			{/* 			}} */}
			{/* 			image={{ uri: similarBook.picture, size: 'medium' }} */}
			{/* 		/> */}
			{/* 	)} */}
			{/* /> */}
		</View>
	)
}

export default Book
