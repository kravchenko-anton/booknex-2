'use client'

import { useAction, useAuth } from '@/hooks'
import { getRefreshToken } from '@/redux/auth/auth-helper'
import { redirect } from 'next/navigation'
import { useEffect, type FC } from 'react'

export const loginRoute = (Component: FC) =>
	function (properties: {}) {
		const { user, isLoading } = useAuth()

		useEffect(() => {
			if (user) redirect('/admin/dashboard')
		}, [user, isLoading])

		return <Component {...properties} />
	}

export const adminRoute = (Component: FC) =>
	function (properties: {}) {
		const { user, isLoading } = useAuth()
		const { logout } = useAction()
		useEffect(() => {
			const checkRefreshToken = async () => {
				const refreshToken = getRefreshToken()
				if (!refreshToken && user) {
					logout()
				}
			}

			checkRefreshToken()
			if (!user && !isLoading) redirect('/')
		}, [user, isLoading])

		return <Component {...properties} />
	}
