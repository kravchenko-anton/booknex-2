"use client";
import type { FC, PropsWithChildren } from 'react'
import Sidebar from '../../components/sidebar/sidebar'

const AdminLayout: FC<PropsWithChildren> = ({ children }) => {

	return <div className='mt-[70px] md:flex'>
		<Sidebar/>
		<div className={`w-full md:ml-14 ease-linear duration-200 p-4 md:w-[
		  calc(100% - 56px)
		]`}>
		{children}
		</div>
	</div>
}

export default AdminLayout
