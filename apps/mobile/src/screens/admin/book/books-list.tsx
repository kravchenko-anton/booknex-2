import BigLoader from '@/components/ui/loader/big-loader'
import AdminLayout from '@/screens/admin/admin-layout/admin-layout'
import { bookService } from '@/services/book-service'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

const AdminBooks = () => {
	const { data: BookList, fetchNextPage } = useInfiniteQuery(
		['admin-books'],
		({ pageParam }) => bookService.all(pageParam as number),
		{
			getNextPageParam: lastPage => {
				if (lastPage.length === 0 || lastPage.length === 1) return
				return Number(lastPage.at(-1)?.id! + 1)
			}
		}
	)
	const { control } = useForm({
		defaultValues: {
			Search: ''
		}
	})
	if (!BookList) return <BigLoader />
	// TODO: сделать тут таблицу как у red group
	return <AdminLayout title={'Book'}></AdminLayout>
}

export default AdminBooks
