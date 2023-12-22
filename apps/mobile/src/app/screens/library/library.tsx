import { ScrollLayout } from '@/components'
import { userServices } from '@/services/user/user-service'
import { useQuery } from '@tanstack/react-query'
import { BigLoader, Title } from 'ui/components'

const Library = () => {
	const { data: library } = useQuery(['user-library'], () =>
		userServices.library()
	)
	// Сделать тут карусели по типу headWay
	if (!library) return <BigLoader />
	return (
		<ScrollLayout className='p-2'>
			<Title size={26} weight='bold'>
				My books
			</Title>
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
