'use client'

import { useCatalog } from '@/app/admin/users/_catalog/useCatalog'
import DataTable from '@/components/table/data-table'
import DataTableHeader from '@/components/table/table-search'
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
