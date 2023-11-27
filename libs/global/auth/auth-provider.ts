import { getItemAsync } from 'expo-secure-store'
import { useEffect } from 'react'
import { useAuth } from '../hooks'
import { errorCatch } from '../utils/catch-error'
import { errorToast } from '../utils/error-toast'

export const useCheckAuth = (routeName?: string) => {
	const { user } = useAuth()
	const { getNewToken, logout } = useAuth()
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
