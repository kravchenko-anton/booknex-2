import Login from '@/screens/auth/login/login'
import Register from '@/screens/auth/register/register'
import SelectGenres from '@/screens/auth/register/select-genres/select-genres'
import CheckEmail from '@/screens/auth/welcome/check-email/check-email'
import Welcome from '@/screens/auth/welcome/welcome'
import Author from '@/screens/author/author'
import Collection from '@/screens/collection/collection'
import Explore from '@/screens/explore/explore'
import Featured from '@/screens/featured/featured'
import Genre from '@/screens/genre/genre'
import Library from '@/screens/library/library'
import Settings from '@/screens/profile/settings/settings'
import updateProfile from '@/screens/profile/update-profile/update-profile'
import Reading from '@/screens/reading/reading'
import Book from '../screens/book/book'
import Profile from '../screens/profile/profile'
import type { IRoute } from './types'

export const routes: IRoute[] = [
	{
		name: 'Featured',
		component: Featured
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
		name: 'Explore',
		component: Explore
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
		name: 'CheckEmail',
		component: CheckEmail
	},
	{
		name: 'SelectGenres',
		component: SelectGenres
	}
]
