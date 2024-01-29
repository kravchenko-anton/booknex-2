import BookFeedback from '@/screens/book-feedback/book-feedback'
import Book from '@/screens/book/book'
import Collection from '@/screens/collection/collection'
import Featured from '@/screens/featured/featured'
import Genre from '@/screens/genre/genre'
import Library from '@/screens/library/library'
import Profile from '@/screens/profile/profile'
import Reader from '@/screens/reading/reader'
import SearchCatalog from '@/screens/search/search'
import Settings from '@/screens/settings/settings'
import * as Header from '@/shared/ui/header/header'
import { Search as SearchIcon, Settings as SettingsIcon } from 'icons'
import type { IRoute } from './types'

export const routes: IRoute[] = [
	{
		name: 'Featured',
		component: Featured,
		options: {
			header: ({ navigation }) => (
				<Header.Head>
					<Header.Logo className='pl-2' />
					<Header.Icon
						className='pr-2'
						icon={SearchIcon}
						onPress={() => navigation.navigate('Search')}
					/>
				</Header.Head>
			),
			headerShown: true
		}
	},
	{
		name: 'BookFeedback',
		component: BookFeedback,
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
				<Header.Head>
					<Header.BackWithTitle title='Library' />
				</Header.Head>
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
		name: 'Genre',
		component: Genre
		// component rendered header with dynamic title
	},
	{
		name: 'Settings',
		component: Settings,
		options: {
			header: () => (
				<Header.Head>
					<Header.BackWithTitle title='Settings' />
				</Header.Head>
			),
			headerShown: true
		}
	},
	{
		name: 'Profile',
		component: Profile,
		options: {
			header: ({ navigation }) => (
				<Header.Head>
					<Header.Logo className='pl-2' />
					<Header.Icon
						className='pr-2'
						icon={SettingsIcon}
						onPress={() => navigation.navigate('Settings')}
					/>
				</Header.Head>
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
