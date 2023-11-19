import BooksList from '@/screens/admin/book/books-list'
import Statistic from '@/screens/admin/statistic/statistic'
import type { IRoute } from './navigation-types'

export const adminRoutes: IRoute[] = [
	{
		name: 'Statistic',
		component: Statistic,
		isAdmin: true
	},
	{
		name: 'BookList',
		component: BooksList,
		isAdmin: true
	}
]
