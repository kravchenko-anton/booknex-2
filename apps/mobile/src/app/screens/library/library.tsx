import { AnimatedPress } from '@/components'
import BookCard from '@/components/book-card/book-card'
import { settings } from '@/components/book-card/settings'
import Layout from '@/components/layout/header-scroll-layout/header-scroll-layout'
import { Flatlist, Image, Loader, Title } from '@/components/ui'
import { useTypedNavigation } from '@/hooks'
import { userServices } from '@/services/user/user-service'
import { useQuery } from '@tanstack/react-query'
import { Color } from 'global/colors'
import { View } from 'react-native'

const Library = () => {
	const { data: library } = useQuery(['user-library'], () =>
		userServices.library()
	)
	const { navigate } = useTypedNavigation()
	if (!library) return <Loader />
	return (
		<Layout.Wrapper
			header={
				<Layout.Header>
					<Layout.BackWithTitle title='Library' />
				</Layout.Header>
			}
		>
			<View className='bg-shade mb-0 mt-4 items-center  p-2 px-0'>
				<Title weight='bold' className='mb-4' color={Color.white}>
					Reading now
				</Title>
				<Flatlist
					mt={0}
					horizontal
					data={library.readingBooks}
					renderItem={({ item }) => (
						//TODO: сделать спрогресс
						<AnimatedPress onPress={() => navigate('Reader', { id: item.id })}>
							<Image
								width={settings.width.md}
								height={settings.height.md}
								url={item.picture}
							/>
							{/* <View */}
							{/* 	className='relative mt-2 h-1.5 w-full rounded-xl' */}
							{/* 	style={{ */}
							{/* 		backgroundColor: Color.vibrant */}
							{/* 	}} */}
							{/* > */}
							{/* 	<View */}
							{/* 		className='absolute left-0 h-1.5 rounded-xl' */}
							{/* 		style={{ */}
							{/* 			backgroundColor: Color.primary, */}
							{/* 			width: '15%' */}
							{/* 		}} */}
							{/* 	></View> */}
							{/* </View> */}
						</AnimatedPress>
					)}
				/>
			</View>
			<Flatlist
				horizontal
				title='Want to read'
				data={library.savedBooks}
				renderItem={({ item }) => (
					<BookCard
						size='sm'
						onPress={() => navigate('Book', { id: item.id })}
						image={{ uri: item.picture }}
						author={item.author.name}
					/>
				)}
			/>
			<Flatlist
				mt={5}
				className='mb-4'
				horizontal
				title='Finished'
				data={library.finishedBooks}
				renderItem={({ item }) => (
					<BookCard
						size='sm'
						onPress={() => navigate('Book', { id: item.id })}
						image={{ uri: item.picture }}
						author={item.author.name}
					/>
				)}
			/>
		</Layout.Wrapper>
	)
}

export default Library
