'use client'
import { useAction, useAuth } from '@/hooks'
import { errorToast } from '@/utils/toast'
import { redirect, usePathname } from 'next/navigation'
import type { FC, PropsWithChildren } from 'react'
import { useEffect, useLayoutEffect } from 'react'

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
	const { user } = useAuth()
	const pathname = usePathname()
	const { getNewToken, logout } = useAction()
	useLayoutEffect(() => {
		if (pathname === '/login' && user) {
			redirect('/admin/dashboard')
		} else if (pathname !== '/login' && !user) {
			redirect('/login')
		}

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
	}, [user])

	useEffect(() => {
		const checkRefreshToken = () => {
			const refreshToken = window.sessionStorage.getItem('refreshToken')
			if (!refreshToken && user) {
				logout()
			}
		}

		checkRefreshToken()
	}, [])

	return children
}
