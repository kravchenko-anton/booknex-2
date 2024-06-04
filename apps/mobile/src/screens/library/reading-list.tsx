import type { CompareReadingBooksType } from '@/screens/library/compareReadingBooks'
import type { ReadingHistoryType } from '@/screens/reader/store/progress-store'
import { Image, Title } from '@/ui'
import { settings } from '@/ui/book-card/settings'
import ProgressBar from '@/ui/progress-bar/progress-bar'
import { Color } from 'global/colors'
import type { FC } from 'react'
import { View } from 'react-native'
import Animated, { JumpingTransition } from 'react-native-reanimated'

interface ReadingListProperties {
	data: CompareReadingBooksType[]
	navigate: any
	sortedHistory: ReadingHistoryType[]
}

export const ReadingList: FC<ReadingListProperties> = ({
	sortedHistory,
	data,
	navigate
}) => (
	<View className='bg-foreground border-bordered mb-0 ml-2 mt-4 rounded-md rounded-r-none border-[1px] border-r-0  p-3 px-0'>
		<View className='pl-4'>
			<Title
				weight='bold'
				color={Color.white}
				onPress={() => {
					throw new Error('Check the error.')
				}}>
				Reading now
			</Title>
			<Title weight='regular' className='mb-4' size={'sm'} color={Color.gray}>
				{data.length.toString()} books
			</Title>
		</View>
		<Animated.FlatList
			horizontal
			showsHorizontalScrollIndicator={false}
			layout={JumpingTransition}
			bounces={false}
			alwaysBounceHorizontal={false}
			ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
			//TODO: сделать тут сортировку если нету интернета исходя из истории
			data={data}
			contentContainerStyle={{
				paddingHorizontal: 12,
				paddingBottom: 8
			}}
			renderItem={({ item: book }: { item: CompareReadingBooksType }) => {
				const latestHistory = sortedHistory?.find(
					historyItem => historyItem.bookSlug === book.slug
				)

				console.log(latestHistory, 'latestHistory of' + book.slug)
				const progress =
					(latestHistory?.endProgress || 0) / 100 || book.progress

				const scrollPosition =
					latestHistory?.scrollPosition || book.scrollPosition
				return (
					<Animated.View
						style={{
							width: settings.width.md
						}}
						onTouchEnd={() => {
							navigate('Reader', {
								slug: book.slug,
								initialScrollPosition: scrollPosition
							})
						}}>
						<Image
							width={settings.width.md}
							height={settings.height.md}
							url={book.picture}
							className='mb-2'
						/>
						<ProgressBar progress={progress} />

						<Title numberOfLines={2} size='md' weight='medium' className='mt-1'>
							{book.title}
						</Title>
					</Animated.View>
				)
			}}
		/>
	</View>
)
