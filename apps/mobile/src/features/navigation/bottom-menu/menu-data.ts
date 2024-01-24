import type { TypeRootStackParameterList } from '@/features/navigation/types'
import type { IconType } from '@/shared/types/global'
import { Bookmarked, Home, Search, User } from 'icons'

export interface IMenuItem {
	icon: IconType
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
