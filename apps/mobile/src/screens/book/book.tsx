import api from '@/api'
import { useTypedNavigation, useTypedRoute } from '@/hooks'
import BookReadingButton from '@/screens/book/book-reading-button'
import BookSaveButton from '@/screens/book/book-save-button'
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
import { useQuery } from '@tanstack/react-query'
import { Color } from 'global/colors'
import { appName } from 'global/utils'
import { ArrowLeft, Share } from 'icons'
import type { FC } from 'react'
import { View } from 'react-native'

const Book: FC = () => {
	const { params } = useTypedRoute<'Book'>()

	const { data: book } = useQuery({
		queryKey: ['book', params.id],
		queryFn: () => api.book.infoById(+params.id),
		select: data => data.data
	})
	const { navigate, goBack } = useTypedNavigation()

	if (!book) return <Loader />
	console.log(book.chapters, 'book.chapters')
	return (
		<ScrollLayout>
			<View className=' rounded-b-4xl overflow-hid5en z-50 items-center justify-between rounded-b-none rounded-t-2xl px-2 pb-4 pt-2'>
				<View className='mt-1 w-full flex-row items-start justify-between'>
					<AnimatedIcon
						variant='muted'
						icon={ArrowLeft}
						size='md'
						onPress={() => goBack()}
					/>
					<AnimatedIcon
						variant='muted'
						icon={Share}
						size='md'
						onPress={() =>
							share(`${book.title} is a great book! Check it on ${appName}!`)
						}
					/>
				</View>
				<Image
					url={book.picture}
					height={280}
					className='mx-auto -mt-5'
					width={180}
					style={{
						borderRadius: 8,
						borderWidth: 1,
						borderColor: Color.bordered
					}}
				/>
			</View>
			<View className=' px-2 pt-2'>
				{/* <View className=' flex-1 flex-row '> */}
				{/* 	<StatisticItem title='Rating' icon={Star} count={book.rating} /> */}
				{/* 	<StatisticItem */}
				{/* 		title='Reading Time' */}
				{/* 		icon={Clock} */}
				{/* 		count={minutesToTime(book.readingTime)} */}
				{/* 	/> */}
				{/* 	<StatisticItem */}
				{/* 		title='Chapters' */}
				{/* 		icon={BookIcon} */}
				{/* 		count={book.chapters} */}
				{/* 	/> */}
				{/* </View> */}
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
			<View className='flex-row justify-between px-2 pt-4'>
				<BookReadingButton id={book.id} />
				<BookSaveButton id={book.id} />
			</View>
			<Flatlist
				horizontal
				title='Explore categories'
				data={book.genres}
				renderItem={({ item: genre }) => (
					<Button
						variant='foreground'
						size='md'
						onPress={() => {
							navigate('Genre', { id: genre.id, name: genre.name })
						}}
					>
						{genre.name}
					</Button>
				)}
			/>
			<Title size='xl' weight='bold' className='mt-4 px-2'>
				What is it about?
			</Title>
			<Description size={18} className='mt-2 px-2 pb-8' weight='light'>
				{book.description}
			</Description>
		</ScrollLayout>
	)
}

export default Book
