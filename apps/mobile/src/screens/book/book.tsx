import { useBook } from '@/screens/book/useBook'
import {
	AnimatedIcon,
	Button,
	Description,
	Flatlist,
	Icon,
	Image,
	Loader,
	ScrollLayout,
	Title
} from '@/ui'
import { share } from '@/utils/share-function'
import { Color } from 'global/colors'
import { minutesToTime } from 'global/helpers/time-converter'
import { appName } from 'global/utils'
import {
	ArrowLeft,
	Book as BookIcon,
	Bookmarked,
	Clock,
	Share,
	Star,
	Text
} from 'icons'
import type { FC } from 'react'
import { View } from 'react-native'

export const StaticItem = ({
	title,
	icon,
	count
}: {
	title: string
	icon: FC
	count: number | string
}) => (
	<View className='bg-foreground border-bordered h-[80px] flex-row items-center rounded-2xl border'>
		<Icon stroke={Color.gray} icon={icon} size={'lg'} variant='transparent' />
		<View>
			<Title size={'sm'} weight='medium' color={Color.gray}>
				{title}
			</Title>
			<Title size={'lg'} weight='bold' color={Color.white}>
				{count}
			</Title>
		</View>
	</View>
)

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
	console.log(book.chapters, 'book.chapters')
	return (
		<ScrollLayout>
			<View className=' z-50 items-center justify-between overflow-hidden rounded-b-3xl px-2 pb-4 pt-2'>
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
							share(`${book.title} is a great book! Check it on ${appName}!`)
						}
					/>
				</View>
				<View className='mt-4 w-full flex-row justify-between'>
					<View className='mr-6 flex-1 flex-col justify-between'>
						<StaticItem title='Rating' icon={Star} count={book.rating} />
						<StaticItem
							title='Reading Time'
							icon={Clock}
							count={minutesToTime(book.readingTime)}
						/>
						<StaticItem
							title='Chapters'
							icon={BookIcon}
							count={book.chapters}
						/>
					</View>
					<Image url={book.picture} height={260} width={170} />
				</View>
			</View>
			<View className=' px-2 pt-2'>
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
					variant='muted'
					size='md'
					onPress={startReadingBook}
				>
					{'Read'}
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
			<Title size='xl' weight='bold' className='mt-4 px-2'>
				What is it about?
			</Title>
			<Description size={18} className='mt-2 px-2 pb-8' weight='light'>
				{book.description}
			</Description>
			<Flatlist
				horizontal
				mt={0}
				title='Explore categories'
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
