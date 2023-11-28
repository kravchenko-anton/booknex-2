import { getItemAsync } from 'expo-secure-store'
import { useEffect } from 'react'
import { useAuth } from '../../../apps/web/hooks/useAuth'
import { useAction } from '../hooks/useAction'
import { errorToast } from '../utils/toast'

export const useCheckAuth = (routeName?: string) => {
	const { user } = useAuth()
	const { getNewToken, logout } = useAction()
	useEffect(() => {
		const checkToken = async () => {
			const accessToken = await getItemAsync('accessToken')
			const refreshToken = await getItemAsync('refreshToken')
			if (!accessToken && refreshToken) {
				try {
					getNewToken(refreshToken)
				} catch (error) {
					errorToast(error)
					logout()
				}
			}
		}
		checkToken()
	}, [user])

	useEffect(() => {
		const checkRefreshToken = async () => {
			const refreshToken = await getItemAsync('refreshToken')
			if (!refreshToken && user) {
				logout()
			}
		}

		checkRefreshToken()
	}, [routeName])
}
