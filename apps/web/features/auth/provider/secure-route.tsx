'use client'

import { useAuth } from '@/features/auth/hook/useAuth'
import { redirect } from 'next/navigation'
import { useEffect, type FC } from 'react'

export const loginRoute = (Component: FC) =>
	function (props: {}) {
		const { user, isLoading } = useAuth()

		useEffect(() => {
			if (user) redirect('/admin/dashboard')
		}, [user, isLoading])

		return <Component {...props} />
	}

export const adminRoute = (Component: FC) =>
	function (props: {}) {
		const { user, isLoading } = useAuth()

		useEffect(() => {
			if (!user && !isLoading) redirect('/login')
		}, [user, isLoading])

		return <Component {...props} />
	}
