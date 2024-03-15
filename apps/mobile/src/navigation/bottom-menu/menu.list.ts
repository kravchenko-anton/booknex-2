import type { TypeRootStackParameterListType } from '@/navigation/navigation-types'
import type { IconType } from '@/types/global'
import { Bookmarked, Home, Search, User } from 'icons'

export interface MenuItemType {
	icon: IconType
	path: keyof TypeRootStackParameterListType
}

export type TypeNavigate = (
	screenName: keyof TypeRootStackParameterListType
) => void

export const menuItems: MenuItemType[] = [
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
