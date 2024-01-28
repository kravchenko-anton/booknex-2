'use client'
import { useAuth } from '@/features/auth/hook/useAuth'
import Sidebar from '@/widgets/sidebar/sidebar'
import { redirect } from 'next/navigation'
import type { FC, PropsWithChildren } from 'react'

const AdminLayout: FC<PropsWithChildren> = ({ children }) => {
	const { user } = useAuth()

	if (!user) {
		redirect('/login')
	}
	return (
		<div className='md:flex'>
			<Sidebar />
			<div className='md:w-[ calc(100% - 224px) ] mt-4 w-full p-4 pt-0 duration-200 ease-linear md:ml-56'>
				{children}
			</div>
		</div>
	)
}

export default AdminLayout
