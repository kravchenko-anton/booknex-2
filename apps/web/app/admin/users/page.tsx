'use client'
import { useData } from '@/features/users/catalog/useData'
import DataTable from '@/widgets/table/data-table'
import DataTableHeader from '@/widgets/table/table-search'
import type { FC } from 'react'

const Page: FC = () => {
	const { headerProperties, tableProperties } = useData()
	return (
		<div className='w-full'>
			<DataTableHeader title='Users' {...headerProperties}></DataTableHeader>
			<DataTable {...tableProperties} />
		</div>
	)
}

export default Page
