import type { TypeRootStackParameterList } from '@/navigation/types'
import type { IconProperties } from '@/types/global'
import { Bookmarked, Home, Search, User } from 'icons'

export interface IMenuItem extends IconProperties {
	path: keyof TypeRootStackParameterList
}

export type TypeNavigate = (
	screenName: keyof TypeRootStackParameterList
) => void

export const menuItems: IMenuItem[] = [
	{
		icon: Home,
		path: 'Featured'
	},

	{
		icon: Search,
		path: 'Search'
	},

	{
		icon: Bookmarked,
		path: 'Library'
	},
	{
		icon: User,
		path: 'Profile'
	}
]
