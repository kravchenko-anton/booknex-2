import { useAuth } from '@/features/auth/useAuth'
import { useTypedNavigation } from '@/hooks'
import { useEffect } from 'react'

export const useAuthorize = () => {
	const { user, isLoading, authType } = useAuth()
	const { navigate } = useTypedNavigation()
	useEffect(() => {
		if (user && authType === 'login') navigate('Featured')
		if (user && authType === 'register') navigate('UpdateRecommendation')
	}, [user, authType])

	return {
		isLoading,
		onMainButtonPress: () => navigate('Register')
	}
}
