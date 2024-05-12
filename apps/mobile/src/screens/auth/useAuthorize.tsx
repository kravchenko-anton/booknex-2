import { useAuthStore } from '@/screens/auth/store/auth-store'
import { useNavigation } from '@react-navigation/native'
import { useEffect } from 'react'

export const useAuthorize = () => {
	const { navigate } = useNavigation<any>()
	const { user, isLoading, authType } = useAuthStore(state => ({
		user: state.user,
		authType: state.authType,
		isLoading: state.isLoading
	}))
	useEffect(() => {
		if (user && authType === 'login')
			//  Matter to prevent error with nested navigation
			navigate('Root', {
				screen: 'Featured'
			})
		if (user && authType === 'register') navigate('Root', { screen: 'Welcome' })
	}, [user, authType])

	return {
		isLoading,
		onContinueWithMail: () => navigate('Login'),
		onCreateAccount: () => navigate('Register')
	}
}
