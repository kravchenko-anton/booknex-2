import { useAction, useAuth } from '@/shared/hooks'
import { errorToast } from '@/shared/utils/toast'
import { errorCatch } from 'global/utils/catch-error'
import { useEffect } from 'react'
import EncryptedStorage from 'react-native-encrypted-storage'

export const useCheckAuth = (routeName?: string) => {
	const { user } = useAuth()
	const { getNewToken, logout } = useAction()
	useEffect(() => {
		const checkToken = async () => {
			const accessToken = await EncryptedStorage.getItem('accessToken')
			const refreshToken = await EncryptedStorage.getItem('refreshToken')
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
	}, [getNewToken, logout, user])

	useEffect(() => {
		const checkRefreshToken = async () => {
			const refreshToken = await EncryptedStorage.getItem('refreshToken')
			if (!refreshToken && user) {
				logout()
			}
		}

		checkRefreshToken()
	}, [logout, routeName, user])
}
