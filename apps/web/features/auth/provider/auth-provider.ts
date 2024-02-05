'use client'
import {
	getRefreshToken,
	getTokensStorage
} from '@/features/auth/action/auth-helper'
import { useAction, useAuth } from '@/shared/hooks'
import { errorToast } from '@/shared/utils/toast'
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
