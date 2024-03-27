import api from '@/api'
import { useTypedNavigation, useTypedRoute } from '@/hooks'
import ReadingButton from '@/screens/book/reading-button'
import SaveButton from '@/screens/book/save-button'
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
import { minutesToTime } from 'global/helpers/time-converter'
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
	return (
		<ScrollLayout>
			<View className='overflow-hid5en z-50 items-center justify-between rounded-b-none rounded-t-2xl px-2 pb-4 pt-2'>
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
				<Image
					url={book.picture}
					height={270}
					className='mx-auto -mt-5'
					width={180}
					style={{
						borderRadius: 8,
						borderWidth: 1,
						borderColor: Color.bordered
					}}
				/>
			</View>

			<View className='px-2 pt-2'>
				<View className='flex-grow flex-row items-center justify-between gap-2'>
					<Title size={'sm'} color={Color.gray} weight='regular'>
						{book.rating} Rating • {minutesToTime(book.readingTime)} read time
					</Title>
				</View>
				<Title numberOfLines={2} weight='semiBold' size={'xxl'}>
					{book.title}
				</Title>
				<Title
					numberOfLines={1}
					color={Color.gray}
					weight='semiBold'
					size={'md'}>
					{book.author}
				</Title>
			</View>

			<View className='flex-row justify-between px-2 pt-4'>
				<ReadingButton id={book.id} />
				<SaveButton id={book.id} />
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
						}}>
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
