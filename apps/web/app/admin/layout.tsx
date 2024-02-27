'use client'
import Sidebar from '@/components/sidebar/sidebar'
import { adminRoute } from '@/providers/secure-route'
import type { FC, PropsWithChildren } from 'react'

const AdminLayout: FC<PropsWithChildren> = ({ children }) => (
	<div className='md:flex'>
		<Sidebar />
		<div className='md:w-[ calc(100% - 190px) ] mt-4 w-full p-4 pt-0 duration-200 ease-linear md:ml-[190px]'>
			{children}
		</div>
	</div>
)

export default adminRoute(AdminLayout)
