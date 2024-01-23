import Alert from '@/components/alert/alert'
import * as Layout from '@/components/layout/header-scroll-layout/header-scroll-layout'
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
import { Search as SearchIcon, Settings as SettingsIcon } from 'icons'
import Book from '../screens/book/book'
import Profile from '../screens/profile/profile'
import type { IRoute } from './types'

export const routes: IRoute[] = [
	{
		name: 'Featured',
		component: Featured,
		options: {
			header: ({ navigation }) => (
				<Layout.Header>
					<Layout.Logo className='pl-2' />
					<Layout.Icon
						className='pr-2'
						icon={SearchIcon}
						onPress={() => navigation.navigate('Search')}
					/>
				</Layout.Header>
			),
			headerShown: true
		}
	},
	{
		name: 'Feedback',
		component: Feedback,
		options: {
			headerShown: false
		}
	},
	{
		name: 'Search',
		component: SearchCatalog,
		options: {
			headerShown: false
		}
	},
	{
		name: 'Library',
		component: Library,
		options: {
			header: () => (
				<Layout.Header>
					<Layout.BackWithTitle title='Library' />
				</Layout.Header>
			),
			headerShown: true
		}
	},
	{
		name: 'Collection',
		component: Collection,
		options: {
			headerShown: false
		}
	},
	{
		name: 'Author',
		component: Author,
		options: {
			headerShown: false
		}
	},
	{
		name: 'Genre',
		component: Genre
		// component rendered header with dynamic title
	},
	{
		name: 'Settings',
		component: Settings,
		options: {
			header: () => (
				<Layout.Header>
					<Layout.BackWithTitle title='Settings' />
				</Layout.Header>
			),
			headerShown: true
		}
	},
	{
		name: 'Profile',
		component: Profile,
		options: {
			header: ({ navigation }) => (
				<Layout.Header>
					<Layout.Logo className='pl-2' />
					<Layout.Icon
						className='pr-2'
						icon={SettingsIcon}
						onPress={() => navigation.navigate('Settings')}
					/>
				</Layout.Header>
			),
			headerShown: true
		}
	},
	{
		name: 'Reader',
		component: Reader,
		options: {
			headerShown: false,
			statusBarHidden: true
		}
	},
	{
		name: 'Book',
		component: Book,
		options: {
			headerShown: false
		}
	}
]

export const authRoutes: IRoute[] = [
	{
		name: 'Welcome',
		component: Welcome
	},
	{
		name: 'Login',
		component: Login,
		options: {
			headerShown: true,
			header: () => (
				<Layout.Header>
					<Layout.BackWithTitle title='Sign in' />
				</Layout.Header>
			)
		}
	},
	{
		name: 'Registration',
		component: Register,
		options: {
			headerShown: true,
			header: () => (
				<Layout.Header>
					<Layout.BackWithTitle title='Sign up' />
				</Layout.Header>
			)
		}
	},
	{
		name: 'SelectGenres',
		component: SelectGenres,
		options: {
			headerShown: true,
			header: () => (
				<Layout.Header>
					<Layout.BackWithTitle title='Select genres' />
				</Layout.Header>
			)
		}
	}
]

export const modalRoutes: IRoute[] = [
	{
		name: 'Alert',
		component: Alert
	}
]
