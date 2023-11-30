"use client";
import type { FC, PropsWithChildren } from 'react'
import { useState } from 'react'
import Sidebar from '../components/sidebar/sidebar'

const AdminLayout: FC<PropsWithChildren> = ({ children }) => {
	const [open, setOpen] = useState(false);

	return <div className='mt-[70px] md:flex'>
		<Sidebar open={open} setOpen={setOpen}/>
		<div
			className={`${open ? "md:ml-14" : "md:ml-32"} ease-linear duration-200 p-2`}
		>
		{children}
		</div>
	</div>
}

export default AdminLayout
