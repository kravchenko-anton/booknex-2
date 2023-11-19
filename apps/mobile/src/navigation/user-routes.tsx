import Author from '@/screens/author/author'
import Featured from '@/screens/featured/featured'
import Genre from '@/screens/genre/genre'
import ComprehensiveList from '@/screens/library/comprehensive-list/comprehensive-list'
import Library from '@/screens/library/library'
import Settings from '@/screens/profile/settings/settings'
import updateProfile from '@/screens/profile/update-profile/update-profile'
import Reading from '@/screens/reading/reading'
import Shelf from '@/screens/shelf/shelf'
import Book from '../screens/book/book'
import Profile from '../screens/profile/profile'
import Search from '../screens/search/search'
import { adminRoutes } from './admin-routes'
import type { IRoute } from './navigation-types'

export const userRoutes: IRoute[] = [
	{
		name: 'Featured',
		component: Featured
	},
	{
		name: 'Library',
		component: Library
	},
	{
		name: 'Shelf',
		component: Shelf
	},
	{
		name: 'Author',
		component: Author
	},
	{
		name: 'ComprehensiveList',
		component: ComprehensiveList
	},
	{
		name: 'Genre',
		component: Genre
	},
	{
		name: 'Settings',
		component: Settings
	},
	{
		name: 'Profile',
		component: Profile
	},
	{
		name: 'UpdateProfile',
		component: updateProfile
	},
	{
		name: 'Reading',
		component: Reading
	},
	{
		name: 'Book',
		component: Book
	},

	{
		name: 'Search',
		component: Search
	}
]

export const routes = [...userRoutes, ...adminRoutes]
