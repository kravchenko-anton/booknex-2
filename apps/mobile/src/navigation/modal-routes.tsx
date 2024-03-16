import ReaderTextSelect from '@/screens/reading/reader-text-select/reader-text-select'
import LogoutAlert from '@/screens/settings/settings-logout'
import type { IRouteType } from './navigation-types'

export const modalRoutes: IRouteType[] = [
	{
		name: 'Logout',
		component: LogoutAlert,
		options: {
			headerShown: false
		}
	},
	{
		name: 'TextSelect',
		component: ReaderTextSelect,
		options: {
			headerShown: false
		}
	}
]
