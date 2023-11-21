import { BigLoader, ScrollLayout, Title } from '@/components'
import BookCarousel from '@/screens/library/book-carousel/book-carousel'
import { userServices } from '@/services/user-service'
import { useQuery } from '@tanstack/react-query'

const Library = () => {
	const { data: library } = useQuery(['user-library'], () =>
		userServices.getLibrary()
	)
	if (!library) return <BigLoader />
	return (
		<ScrollLayout className='p-2'>
			<Title size={26} weight={'bold'}>
				My books
			</Title>
			<BookCarousel />
			{
			// 	Сделать тут карусели по типу headWay
			}
			{/* <FlatList*/}
			{/*	mt={25}*/}
			{/*	scrollEnabled={false}*/}
			{/*	title={{*/}
			{/*		text: 'Books'*/}
			{/*	}}*/}
			{/*	data={library.books}*/}
			{/*	renderItem={({ item }) => (*/}
			{/*		<LibraryCard*/}
			{/*			onPress={() => {*/}
			{/*				navigate('ComprehensiveList', { type: item.type })*/}
			{/*			}}*/}
			{/*			icon={item.icon}*/}
			{/*			name={item.name}*/}
			{/*			count={item.count}*/}
			{/*		/>*/}
			{/*	)}*/}
			{/* />*/}
			{/* <FlatList*/}
			{/*	mt={25}*/}
			{/*	className='mb-5'*/}
			{/*	scrollEnabled={false}*/}
			{/*	title={{*/}
			{/*		text: 'Shelves'*/}
			{/*	}}*/}
			{/*	data={library.shelves}*/}
			{/*	renderItem={({ item }) => (*/}
			{/*		<LibraryCard*/}
			{/*			onPress={() => {*/}
			{/*				navigate('ComprehensiveList', { type: item.type })*/}
			{/*			}}*/}
			{/*			icon={item.icon}*/}
			{/*			name={item.name}*/}
			{/*			count={item.count}*/}
			{/*		/>*/}
			{/*	)}*/}
			{/* />*/}
		</ScrollLayout>
	)
}

export default Library
