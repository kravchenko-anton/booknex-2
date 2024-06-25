import api from '@/api'
import { useTypedNavigation } from '@/hooks'
import { ReadingList } from '@/screens/library/reading-list'
import { useLibraryWithSync } from '@/screens/library/useLibraryWithSync'
import { BookCard, Flatlist, Image, Loader, ScrollLayout, Title } from '@/ui'
import { AnimatedPressable } from '@/ui/animated-components'
import NothingFount from '@/ui/nothing-fount'
import { useQuery } from '@tanstack/react-query'
import { Color } from 'global/colors'
import { QueryKeys } from 'global/utils/query-keys'
import { RefreshControl, View } from 'react-native'
import { FadeIn } from 'react-native-reanimated'

const Library = () => {
	const { navigate } = useTypedNavigation()
	const { library, refetch, readingList } = useLibraryWithSync()
	const { data: userReactionsList = [], refetch: userReactionsListRefetch } =
		useQuery({
			queryKey: QueryKeys.reaction.list,
			queryFn: () => api.reaction.reactionList(),
			select: data => data.data,
			staleTime: 0,
			refetchOnMount: true,
			refetchOnWindowFocus: true
		})
	console.log(userReactionsList)
	if (!library) return <Loader />
	if (
		library.readingBooks.length === 0 &&
		library.savedBooks.length === 0 &&
		library.finishedBooks.length === 0
	)
		return (
			<NothingFount
				text={
					'You haven’t saved any books yet. \n' +
					'Go to the catalog and find something to read.'
				}
			/>
		)
	return (
		<ScrollLayout
			refreshControl={
				<RefreshControl
					refreshing={false}
					colors={[Color.white]}
					progressBackgroundColor={Color.transparent}
					onRefresh={() => {
						refetch()
						userReactionsListRefetch()
					}}
				/>
			}>
			<ReadingList data={readingList} navigate={navigate} />
			<Flatlist
				horizontal
				title='Saved to read'
				data={library.savedBooks}
				renderItem={({ item: book }) => (
					<BookCard
						size='sm'
						image={{ uri: book.picture }}
						author={book.author}
						onPress={() => navigate('Book', { slug: book.slug })}
					/>
				)}
			/>
			<Flatlist
				horizontal
				mt={5}
				className='mb-4'
				title='Finished'
				data={library.finishedBooks}
				renderItem={({ item: book }) => (
					<BookCard
						size='sm'
						image={{ uri: book.picture }}
						author={book.author}
						onPress={() => navigate('Book', { slug: book.slug })}
					/>
				)}
			/>
			<View className='mx-2'>
				<Flatlist
					mt={5}
					className='mb-4'
					title='Reations'
					scrollEnabled={false}
					data={userReactionsList}
					renderItem={({ item: reaction, index }) => (
						<AnimatedPressable
							entering={FadeIn.duration(1000).delay(100 * index)}
							className='bg-foreground border-muted flex-row justify-between rounded-lg border-2 px-2 py-1'
							onPress={() => navigate('Reactions', { slug: reaction.slug })}>
							<View className='border-bordered rounded-lg border-[1px]'>
								<Image url={reaction.picture} height={74} width={50} />
							</View>

							<View className='ml-2 w-2/3 '>
								<Title
									numberOfLines={2}
									color={Color.white}
									weight='medium'
									size={'lg'}>
									{reaction.title}
								</Title>
								<Title
									numberOfLines={1}
									weight='regular'
									size={'md'}
									color={Color.gray}>
									{reaction.author}
								</Title>
							</View>

							<View className='flex-row  items-center justify-between'>
								<View className='bg-bordered h-[40px] w-[40px] flex-row items-center justify-center rounded-full'>
									<Title
										size='xl'
										weight='bold'
										numberOfLines={1}
										color={Color.white}>
										{reaction.count}
									</Title>
								</View>
							</View>
						</AnimatedPressable>
					)}
				/>
			</View>
		</ScrollLayout>
	)
}

export default Library
