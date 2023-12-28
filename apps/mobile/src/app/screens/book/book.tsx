import { BookCard } from '@/components'
import { useBook } from '@/screens/book/useBook'
import { Alert, ChevronLeft, Pen, Plus, Share as ShareIcon, Text } from 'icons'
import { Share, StatusBar, View } from 'react-native'
import Animated from 'react-native-reanimated'
import { Color } from 'ui/colors'
import {
	AnimatedIcon,
	Button,
	Description,
	Flatlist,
	Image,
	Loader,
	Title
} from 'ui/components'
import * as DropDown from '../../components/dropdown/dropdown'

const Book = () => {
	const { book, navigate } = useBook()
	if (!book) return <Loader />
	return (
		<Animated.ScrollView
			overScrollMode='never'
			showsVerticalScrollIndicator={false}
		>
			<StatusBar barStyle='light-content' backgroundColor={Color.shade} />
			<View className='bg-shade z-50 items-center justify-between overflow-hidden rounded-b-3xl px-4 pb-6 pt-2'>
				<Animated.View className='mb-2 w-full flex-row items-center justify-between'>
					<AnimatedIcon
						onPress={navigate.back}
						icon={ChevronLeft}
						variant='foreground'
						size='md'
					/>

					<DropDown.Menu size='md' position='right'>
						<DropDown.Element
							title='Add'
							icon={Plus}
							onPress={() => {
								navigate.reading()
							}}
						/>
						<DropDown.Element
							title='Share'
							icon={ShareIcon}
							onPress={() => {
								Share.share({
									message: `Wow! I see ${
										book?.title || 'amazing'
									} book on Booknex and I think you will like it too!`
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
					</DropDown.Menu>
				</Animated.View>
				<Image url={book.picture} height={260} width={170} />
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
						size={14}
						onPress={() => navigate.author(book.author.id)}
						className='mt-1'
					>
						{book.author.name}
					</Title>
				</View>
				<Button
					icon={Text}
					className='rounded-xl'
					onPress={() => {
						navigate.reading()
					}}
					text='Read'
					variant='primary'
					size='sm'
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

			<Flatlist
				data={book.similarBooks}
				horizontal
				px={16}
				title={{
					text: 'Similar books'
				}}
				renderItem={({ item: similarBook }) => (
					<BookCard
						size='md'
						onPress={() => {
							navigate.similar(similarBook.id)
						}}
						image={{ uri: similarBook.picture }}
					/>
				)}
			/>
		</Animated.ScrollView>
	)
}

export default Book
