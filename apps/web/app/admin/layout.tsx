'use client'
import type { FC, PropsWithChildren } from 'react'
import Sidebar from '../../components/sidebar/sidebar'

const AdminLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className='mt-[70px] md:flex'>
			<Sidebar />
			<div
				className={`md:w-[ calc(100% - 56px) ] w-full
		  p-4 duration-200 ease-linear
		md:ml-16`}>
				{children}
			</div>
		</div>
	)
}

export default AdminLayout
