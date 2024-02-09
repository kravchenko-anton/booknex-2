import { useAuth, useTypedNavigation } from '@/hooks'
import { useEffect, type FC } from 'react'

export const authRoute = (Component: FC) =>
	function (props: {}) {
		const { user, authType } = useAuth()
		const { navigate } = useTypedNavigation()
		useEffect(() => {
			if (user && authType === 'login') navigate('Featured')
			if (user && authType === 'register') navigate('UpdateRecommendation')
		}, [user, authType])

		return <Component {...props} />
	}
