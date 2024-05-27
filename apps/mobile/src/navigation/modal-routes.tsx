import CreateNote from '@/screens/reading/reader-notes/create-note/create-note'
import ReaderNotes from '@/screens/reading/reader-notes/reader-notes'
import LogoutAlert from '@/screens/settings/logout-dialog'
import type { IRouteType } from './navigation-types'

export const modalRoutes: IRouteType[] = [
	{
		name: 'Logout',
		component: LogoutAlert,
		options: {
			headerShown: false
		}
	}
]

export const fullScreenModalRoutes: IRouteType[] = [
	{
		name: 'CreateNote',
		component: CreateNote,
		options: {
			headerShown: false
		}
	},
	{
		name: 'Note',
		component: ReaderNotes,
		options: {
			headerShown: false
		}
	}
]
