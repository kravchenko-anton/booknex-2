'use client';
import { redirect, usePathname } from 'next/navigation'
import type { FC, PropsWithChildren } from 'react'
import { useEffect, useLayoutEffect } from 'react'
import { useAuth } from '../../../apps/web/hooks/useAuth'
import { useAction } from '../hooks/useAction'
import { errorToast } from '../utils/toast'

export const AuthProvider:FC<PropsWithChildren> = ({ children }) => {
	const { user } = useAuth()
  const pathname  = usePathname()
	const { getNewToken, logout } = useAction()
	useLayoutEffect(() => {
    if (pathname === '/login' && user) {
      redirect('/admin/dashboard')
    } else if (pathname !== '/login' && !user) {
      redirect('/login')
    }

		const checkToken = async () => {
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
		const checkRefreshToken = async () => {
			const refreshToken = window.sessionStorage.getItem('refreshToken')
			if (!refreshToken && user) {
				logout()
			}
		}

		checkRefreshToken()
	}, [])


  return children
}
