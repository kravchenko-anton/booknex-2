'use client'
import { useCatalog } from '@/features/users/catalog/useCatalog'
import DataTable from '@/widgets/table/data-table'
import DataTableHeader from '@/widgets/table/table-search'
import type { FC } from 'react'

const Page: FC = () => {
	const { headerProperties, tableProperties } = useCatalog()
	return (
		<div className='w-full'>
			<DataTableHeader title='Users' {...headerProperties} />
			<DataTable {...tableProperties} />
		</div>
	)
}

export default Page
