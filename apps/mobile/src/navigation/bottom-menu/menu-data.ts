import { Bookmarked, Home, Search, User } from '@/icons'
import type { IMenuItem } from './menu.interface'

export const menuItems: IMenuItem[] = [
	{
		icon: Home,
		path: 'Featured'
	},

	{
		icon: Bookmarked,
		path: 'Library'
	},
	{
		icon: Search,
		path: 'Search'
	},

	{
		icon: User,
		path: 'Profile'
	}
]
