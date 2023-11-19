import BookCard from '@/components/book-card/book-card'
import BigLoader from '@/components/ui/loader/big-loader'
import { Title } from '@/components/ui/title/title'
import AdminLayout from '@/screens/admin/admin-layout/admin-layout'
import { adminService } from '@/services/admin-service'
import { useQuery } from '@tanstack/react-query'
import { View } from 'react-native'

const Statistic = () => {
	const { data: statistic } = useQuery(['statistic'], () =>
		adminService.statistics()
	)
	if (!statistic) return <BigLoader />
	return (
		<AdminLayout title={'Statistic'} className='px-2'>
			<View className='flex-row items-center justify-between gap-4 pt-4'>
				<View className='flex-1 items-center rounded-xl border-2 border-b-black p-2'>
					<Title size={22} weight={'bold'}>
						Users
					</Title>
					<Title size={18} weight={'regular'}>
						{statistic.totalUsers}
					</Title>
				</View>
				<View className='flex-1 items-center rounded-xl border-2 border-b-black p-2'>
					<Title size={22} weight={'bold'}>
						Total Read Time
					</Title>
					<Title size={18} weight={'regular'}>
						{`${Math.round(statistic.totalReadTime / 60 / 60)} hours`}
					</Title>
				</View>
			</View>
			<Title size={24} className='mt-2' weight={'bold'} center>
				Most read books
			</Title>
			<View className='mt-4 flex-row items-center justify-between px-4'>
				{statistic.mostReadBook.map(book => (
					<BookCard
						image={{
							uri: book.picture,
							size: 'medium'
						}}
						key={book.id}
						title={book.title}
					/>
				))}
			</View>
		</AdminLayout>
	)
}

export default Statistic
