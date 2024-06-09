'use client'

import { getRefreshToken } from '@/services/store/auth-helper'
import { useAuthStore } from '@/services/store/auth-store'
import { publicRoutes, secureRoutes } from '@/utils/route'
import { redirect } from 'next/navigation'
import { useLayoutEffect, type FC } from 'react'

export const loginRoute = (Component: FC) =>
	function (properties: NonNullable<unknown>) {
		const { user, isLoading } = useAuthStore(state => ({
			user: state.user,
			isLoading: state.isLoading
		}))

		useLayoutEffect(() => {
			if (user) redirect(secureRoutes.dashboard)
		}, [user, isLoading])

		return <Component {...properties} />
	}

export const adminRoute = (Component: FC) =>
	function (properties: NonNullable<unknown>) {
		const { user, isLoading, logout } = useAuthStore(state => ({
			user: state.user,
			isLoading: state.isLoading,
			logout: state.logout
		}))
		useLayoutEffect(() => {
			const checkRefreshToken = async () => {
				const refreshToken = getRefreshToken()
				if (!refreshToken && user && !isLoading) {
					logout()
				}
			}

			checkRefreshToken()
			if (!user && !isLoading) redirect(publicRoutes.login)
		}, [user, isLoading])

		return <Component {...properties} />
	}
