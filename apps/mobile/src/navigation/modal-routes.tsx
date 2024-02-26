import LogoutAlert from '@/screens/settings/modal/logout'
import type { IRouteType } from './types'

export const modalRoutes: IRouteType[] = [
	{
		name: 'Logout',
		component: LogoutAlert,
		options: {
			headerShown: false
		}
	}
]
