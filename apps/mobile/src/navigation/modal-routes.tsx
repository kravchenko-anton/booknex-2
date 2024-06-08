import Reaction from '@/screens/reaction/reaction'
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
		name: 'Reactions',
		component: Reaction,
		options: {
			headerShown: false
		}
	}
]
