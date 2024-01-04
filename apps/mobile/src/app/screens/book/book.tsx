import { BookCard, ScrollLayout } from '@/components'
import { useTypedNavigation } from '@/hooks'
import { useBook } from '@/screens/book/useBook'
import { Alert, Pen, Share as ShareIcon, Text } from 'icons'
import { Share, StatusBar, View } from 'react-native'
import { Color } from 'ui/colors'
import {
	Button,
	Description,
	Flatlist,
	Image,
	Loader,
	Title
} from 'ui/components'
import * as DropDown from '../../components/dropdown/dropdown'
import * as Header from '../../components/header/header'

const Book = () => {
	const { book } = useBook()
	const { navigate } = useTypedNavigation()
	if (!book) return <Loader />
	return (
		<ScrollLayout statusBarBackgroundColor={Color.shade}>
			<StatusBar barStyle='light-content' backgroundColor={Color.shade} />
			<View className='bg-shade z-50 items-center justify-between overflow-hidden rounded-b-3xl px-4 pb-6 pt-2'>
				<Header.Head>
					<Header.DropDown>
						<DropDown.Element
							title='Share'
							icon={ShareIcon}
							onPress={() => {
								Share.share({
									message: `Wow! I see ${
										book?.title || 'amazing'
									} book on booker and I think you will like it too!`
								})
							}}
						/>
						<DropDown.Element
							title='Report problem'
							icon={Alert}
							onPress={() => {
								console.log('Report problem')
							}}
						/>
						<DropDown.Element
							title='Write review'
							icon={Pen}
							onPress={() => {
								console.log('Write review')
							}}
						/>
					</Header.DropDown>
				</Header.Head>
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
					className='rounded-xl'
					onPress={() => {
						navigate('Reader', { id: book.id })
					}}
					text='Read'
					variant='primary'
					size='sm'
				/>
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
						text={genre.name}
					/>
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
