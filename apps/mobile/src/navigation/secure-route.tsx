import { getRefreshToken } from '@/features/auth/action/auth-helper'
import { useAction, useAuth, useTypedNavigation } from '@/hooks'
import { useEffect } from 'react'

export const loginRoute = (Component: React.ComponentType) =>
	function (props: {}) {
		const { user, authType } = useAuth()
		const { navigate } = useTypedNavigation()
		useEffect(() => {
			if (user && authType === 'login') navigate('Featured')
			if (user && authType === 'register') navigate('UpdateRecommendation')
		}, [user, authType])

		return <Component {...props} />
	}

export const authRequired = (Component: React.ComponentType) =>
	function (props: {}) {
		const { user, isLoading } = useAuth()
		const { logout } = useAction()
		const { navigate } = useTypedNavigation()
		useEffect(() => {
			const checkRefreshToken = async () => {
				const refreshToken = await getRefreshToken()
				console.log('refreshToken in check refresh', refreshToken)
				if (!refreshToken && user) {
					console.warn('logout')
					logout()
				}
			}
			checkRefreshToken()
			if (!user && !isLoading) navigate('Welcome')
		}, [user, isLoading])

		return <Component {...props} />
	}
