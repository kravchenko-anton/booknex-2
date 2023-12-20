'use client'
import { StyledContent, StyledWrapper } from '@/app/admin/styles'
import type { FC, PropsWithChildren } from 'react'
import Sidebar from '../../components/sidebar/sidebar'

const AdminLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<StyledWrapper>
			<Sidebar />
			<StyledContent>{children}</StyledContent>
		</StyledWrapper>
	)
}

export default AdminLayout
