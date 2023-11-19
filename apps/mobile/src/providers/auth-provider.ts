import { useAction } from '@/hooks/useAction'
import { useAuth } from '@/hooks/useAuth'
import { errorCatch } from '@/utils/catch-error'
import { errorToast } from '@/utils/error-toast'
import { getItemAsync } from 'expo-secure-store'
import { useEffect } from 'react'

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
					errorToast(errorCatch(error))
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
