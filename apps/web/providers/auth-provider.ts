'use client'
import { useAction, useAuth } from '@/hooks'
import { getRefreshToken, getTokensStorage } from '@/redux/auth/auth-helper'
import { errorToast } from '@/utils/toast'
import { useEffect, type FC, type PropsWithChildren } from 'react'

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
	const { user } = useAuth()
	const { getNewToken, logout } = useAction()
	useEffect(() => {
		const checkToken = () => {
			const { accessToken, refreshToken } = getTokensStorage()
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

	useEffect(() => {
		const checkRefreshToken = () => {
			const refreshToken = getRefreshToken()
			if (!refreshToken && user) {
				logout()
			}
		}

		checkRefreshToken()
	}, [logout, user])

	return children
}
