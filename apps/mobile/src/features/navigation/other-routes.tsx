import LogoutModal from '@/features/auth/modal/logout-modal'
import type { IRoute } from '@/features/navigation/types'

const modalRoutes: IRoute[] = [
	{
		name: 'LogoutModal',
		component: LogoutModal
	}
]

export const otherRoutes = [...modalRoutes]
