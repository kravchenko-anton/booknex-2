'use client'
import { useAction, useAuth } from '@/shared/hooks'
import { errorToast } from '@/shared/utils/toast'
import type { FC, PropsWithChildren } from 'react'
import { useLayoutEffect } from 'react'

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
	const { user } = useAuth()
	const { getNewToken, logout } = useAction()
	useLayoutEffect(() => {
		const checkToken = () => {
			const accessToken = window.sessionStorage.getItem('accessToken')
			const refreshToken = window.sessionStorage.getItem('refreshToken')
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
	}, [getNewToken, logout, user])

	useLayoutEffect(() => {
		const checkRefreshToken = () => {
			const refreshToken = window.sessionStorage.getItem('refreshToken')
			if (!refreshToken && user) {
				console.log('logout')
				logout()
			}
		}

		checkRefreshToken()
	}, [logout, user])

	return children
}
