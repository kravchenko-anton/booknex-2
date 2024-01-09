'use client'
import { AdminNavbar } from '@/components/navbar/admin-navbar'
import type { FC, PropsWithChildren } from 'react'

const AdminLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div>
			<div className=' w-full p-3 duration-200 ease-linear'>
				<AdminNavbar />
				<div className='mt-[10px]'>{children}</div>
			</div>
		</div>
	)
}

export default AdminLayout
