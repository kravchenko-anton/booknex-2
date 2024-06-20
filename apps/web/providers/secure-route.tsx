'use client'

import { getRefreshToken } from '@/services/store/auth-helper'
import { useAuthStore } from '@/services/store/auth-store'
import { publicRoutes, secureRoutes } from '@/utils/route'
import { redirect } from 'next/navigation'
import { useEffect, type FC } from 'react'

export const loginRoute = (Component: FC) =>
	function (properties: NonNullable<unknown>) {
		const { user, isLoading } = useAuthStore(state => ({
			user: state.user,
			isLoading: state.isLoading
		}))
		console.log('user', user, isLoading)
		useEffect(() => {
			if (user && !isLoading) redirect(secureRoutes.bookCatalogRoute)
		}, [user])

		return <Component {...properties} />
	}

export const adminRoute = (Component: FC) =>
	function (properties: NonNullable<unknown>) {
		const { user, isLoading, logout } = useAuthStore(state => ({
			user: state.user,
			isLoading: state.isLoading,
			logout: state.logout
		}))
		useEffect(() => {
			const checkRefreshToken = () => {
				const refreshToken = getRefreshToken()
				if (!refreshToken && user && !isLoading) {
					logout()
					redirect(publicRoutes.login)
				}
			}

			checkRefreshToken()
		}, [user])

		return <Component {...properties} />
	}
