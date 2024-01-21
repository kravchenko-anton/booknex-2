import Login from '@/screens/auth/login/login'
import Register from '@/screens/auth/register/register'
import SelectGenres from '@/screens/auth/register/select-genres/select-genres'
import Welcome from '@/screens/auth/welcome/welcome'
import Author from '@/screens/author/author'
import Collection from '@/screens/collection/collection'
import Featured from '@/screens/featured/featured'
import Genre from '@/screens/genre/genre'
import Library from '@/screens/library/library'
import Feedback from '@/screens/reading/feedback/feedback'
import { Reader } from '@/screens/reading/reader'
import SearchCatalog from '@/screens/search/search'
import Settings from '@/screens/settings/settings'
import Book from '../screens/book/book'
import Profile from '../screens/profile/profile'
import type { IRoute } from './types'

export const routes: IRoute[] = [
	{
		name: 'Featured',
		component: Featured
	},
	{
		name: 'Feedback',
		component: Feedback
	},
	{
		name: 'Search',
		component: SearchCatalog
	},
	{
		name: 'Library',
		component: Library
	},
	{
		name: 'Collection',
		component: Collection
	},
	{
		name: 'Author',
		component: Author
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
		name: 'Reader',
		component: Reader
	},
	{
		name: 'Book',
		component: Book
	}
]

export const authRoutes: IRoute[] = [
	{
		name: 'Welcome',
		component: Welcome
	},
	{
		name: 'Login',
		component: Login
	},
	{
		name: 'Registration',
		component: Register
	},
	{
		name: 'SelectGenres',
		component: SelectGenres
	}
]
