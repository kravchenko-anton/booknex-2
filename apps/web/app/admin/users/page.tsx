'use client'
import { useData } from '@/app/admin/users/useData'
import DataTable from '@/components/data-table'
import DataTableHeader from '@/components/table-search'
import type { FC } from 'react'

const PageDetails: FC = () => {
	const { headerProperties, tableProperties } = useData()
	return (
		<div className='w-full'>
			<DataTableHeader title='Users' {...headerProperties}></DataTableHeader>
			<DataTable {...tableProperties} />
		</div>
	)
}

export default PageDetails
